const fs = require('fs');

let text = fs.readFileSync('input.txt');
let textbyLine = text.toString().split('\n');


let oppMove = [];
let yourMove = [];


textbyLine.forEach( (line) => {
    let words = line.split(' ');
    oppMove.push(words[0]);
    yourMove.push(words[1]);
});

let total = 0;

for(let i = 0; i < yourMove.length; i++){
    if (yourMove[i] === 'Y') {
        total += 3;
    } else if (yourMove[i] === 'Z') {
        total += 6;
    }
}


for(let i = 0; i < oppMove.length; i++){
    let yourChoice;
    if(yourMove[i] === 'X'){
        yourChoice = mustLoseChoice(oppMove[i]);
         total += yourChoiceScore(yourChoice);
    } else if (yourMove[i] === 'Y'){
        yourChoice = mustDrawChoice(oppMove[i]);
        total += yourChoiceScore(yourChoice);
    } else if (yourMove[i] === 'Z'){
        yourChoice = mustWinChoice(oppMove[i]);
        total += yourChoiceScore(yourChoice);
    }
}
//console.log(oppMove[oppMove.length - 2]);
//console.log(yourMove[yourMove.length - 2]);
console.log(total);

function mustLoseChoice(move){
    if (move === 'A'){
        return 'Z';
    } else if (move === 'B'){
        return 'X';
    } else if (move === 'C'){
        return 'Y';
    }
}

function mustWinChoice(move){
    if (move === 'A'){
        return 'Y';
    } else if (move === 'B'){
        return 'Z';
    } else if (move === 'C'){
        return 'X';
    }
}

function mustDrawChoice(move){
    if (move === 'A'){
        return 'X';
    } else if (move === 'B'){
        return 'Y';
    } else if (move === 'C'){
        return 'Z';
    }
}


function yourChoiceScore(move){
    if (move === 'X') {
        return 1;
    } else if (move === 'Y') {
        return 2;
    } else if (move === 'Z') {
        return 3;
    }
}