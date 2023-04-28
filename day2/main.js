
const fs = require('fs');
const textbyLine = fs.readFileSync('input.txt').toString().split('\n');
textbyLine.pop();

let oppMove = [];
let yourMove = [];
textbyLine.forEach( (line) => {
    const words = line.split(' ');
    oppMove.push(words[0]);
    yourMove.push(words[1]);
});


const transposeMap = new Map().set('A', 'X').set('B', 'Y').set('C', 'Z');
oppMove = transposeOppMove(oppMove, transposeMap);
const pointMap = new Map().set('X', 1).set('Y', 2).set('Z', 3);
const winningMove = new Map().set('X', 'Y').set('Y', 'Z').set('Z', 'X');
const losingMove = new Map().set('X', 'Z').set('Y', 'X').set('Z', 'Y');

// Part 1
console.log (choiceTotal(yourMove, pointMap) + winsTotal(oppMove, yourMove, winningMove));

// Part 2
let total = 0;
for(let i = 0; i < oppMove.length; i++){
    let yourChoice;
    if(yourMove[i] === 'X'){
        yourChoice = losingMove.get(oppMove[i]);
         total += pointMap.get(yourChoice);
    } else if (yourMove[i] === 'Y'){
        yourChoice = oppMove[i];
        total += pointMap.get(yourChoice) + 3;
    } else if (yourMove[i] === 'Z'){
        yourChoice = winningMove.get(oppMove[i]);
        total += pointMap.get(yourChoice) + 6;
    }
}
console.log(total);

function choiceTotal(yourMove, pointMap) {
    let total = 0;
    yourMove.forEach((move) => total += pointMap.get(move));
    return total;
}

function winsTotal(oppMove, yourMove, winningMove){
    let total = 0;
    // total + 0 for a loss
    // total + 3 for a tie
    // total + 6 for a win
    for (let i = 0; i < oppMove.length; i++) {
        if (oppMove[i] === yourMove[i]) {
            total += 3;
        } else if(yourMove[i] == winningMove.get(oppMove[i])){
            total += 6;
        } 
    }
    return total;
}

function transposeOppMove(oppMove, transposeMap){
    return oppMove.map( (move) => transposeMap.get(move));
}


function mustDraw(move){
    return move;
}

function mustWin(move, winningMove){
    return winningMove.get(move);
}

function mustLose(move, losingMove){
    return losingMove.get(move);
}

function mustDrawChoice(move){
    return move;
}


function moveChoiceSore(move, pointMap){
    return pointMap.get(move);
}






