
// using file system module in node.js 
const fs = require('fs');
const { text } = require('stream/consumers');

const textbyLine = fs.readFileSync('input.txt').toString().split('\n');


let oppMove = [];
let yourMove = [];
textbyLine.forEach( (line) => {
    let words = line.split(' ');
    oppMove.push(words[0]);
    yourMove.push(words[1]);
});
const arrKeys = [['X', 'X'], ['Y', 'Y'], ['Z', 'Z'], ['X', 'Y'], ['X', 'Z'], ['Y', 'X'], ['Y', 'Z'], ['Z', 'X'], ['Z', 'Y']];
let arr1 = ['X', 'X'];
const scoreScenarios = new Map()
.set(arrKeys[0], 3)
.set(arrKeys[1], 3)
.set(arrKeys[2], 3)
.set(arrKeys[3], 6)
.set(arrKeys[4], 0)
.set(arrKeys[5], 0)
.set(arrKeys[6], 6)
.set(arrKeys[7], 6)
.set(arrKeys[8], 0);


oppMove = transposeOppMove(oppMove); // converts ABC to XYZ


console.log(choiceTotal(yourMove));
console.log (choiceTotal(yourMove) + winsTotal(oppMove, yourMove));
console.log(nonSusStrategy(oppMove, yourMove));

function choiceTotal(yourMove) {
    let total = 0;
    for (let i = 0; i < yourMove.length; i++) {
        if (yourMove[i] === 'X') {
            total += 1;
        } else if (yourMove[i] === 'Y') {
            total += 2;
        } else if (yourMove[i] === 'Z') {
            total += 3;
        }
    }
    return total;
}

function winsTotal(oppMove, yourMove, scoreScenarios, arrKeys){
    let total = 0;
    

    // total + 0 for a loss
    // total + 3 for a tie
    // total + 6 for a win
    for(let i = 0; i < oppMove.length; i++){
        const key = arrKeys.Map( (element) => {
        if( element == [oppMove[i], yourMove[i]]){
            return element;
        }
    });
        //console.log(key);
        if(typeof scoreScenarios.get(key) == 'number'){
            total += scoreScenarios.get(key);
        };
        console.log(scoreScenarios.has(key));
    }

    return total;
}

function transposeOppMove(oppMove){
    for (let i = 0; i < oppMove.length; i++) {
        if (oppMove[i] === 'A'){
            oppMove[i] = 'X';
        }
        else if (oppMove[i] === 'B'){
            oppMove[i] = 'Y';
        }
        else if (oppMove[i] === 'C'){
            oppMove[i] = 'Z';
        }
    }
    return oppMove;
}


function mustDraw(move){
    return move;
}

function mustWin(move){
    if (move === 'X'){
        return 'Y';
    } else if (move === 'Y'){
        return 'Z';
    }
    else if (move === 'Z'){
        return 'X';
    }
}

function mustLose(move){
    if (move === 'X'){
        return 'Z';
    } else if (move === 'Y'){
        return 'X';
    }
    else if (move === 'Z'){
        return 'Y';
    }
    
}

function moveChoiceSore(move){
    if (move === 'X'){
        return 1;
    }
    else if (move === 'Y'){
        return 2;
    }
    else if (move === 'Z'){
        return 3;
    }
}

function nonSusStrategy(oppMove, yourMove){
    let total = 0;
    for (let i = 0; i < oppMove.length; i++) {
        if (yourMove[i] === 'X'){
            total += moveChoiceSore(mustLose(yourMove[i]));
        } else if (yourMove[i] === 'Y'){
            total += moveChoiceSore(mustDraw(yourMove[i])) + 3;
        } else if (yourMove[i] === 'Z'){
            total += moveChoiceSore(mustWin(yourMove[i])) + 6;
        }
    }
    return total;
}




