const fs = require('fs');
const Instructions = require('./Instructions.js');
const textByLine = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const _ = require('lodash');

let instructions  = [];

for(let i = 0; i < textByLine.length; i++){
const line = textByLine[i].split(' ');
let p = new Instructions(Number(line[1]), Number(line[3]) - 1, Number(line[5]) - 1);
instructions.push(p);
}

instructions.pop(instructions.length - 1);

// 2d array will represent the crates and the stack
// first array will represent the stacks
// second array will represent the crates in each stack
// last index of each stack will represent the top of the stack


// Hard Coded!
let stacks = [[],[],[],[],[],[],[],[],[]];
stacks[0] = ['B', 'Z', 'T'];
stacks[1] = ['V', 'H', 'T', 'D', 'N'];
stacks[2] = ['B', 'F', 'M', 'D'];
stacks[3] = ['T', 'J', 'G', 'W', 'V', 'Q', 'L'];
stacks[4] = ['W', 'D', 'G', 'P', 'V', 'F', 'Q', 'M'];
stacks[5] = ['V', 'Z', 'Q', 'G', 'H', 'F', 'S'];
stacks[6] = ['Z', 'S', 'N', 'R', 'L', 'T', 'C', 'W'];
stacks[7] = ['Z', 'H', 'W', 'D', 'J', 'N', 'R', 'M'];
stacks[8] = ['M', 'Q', 'L', 'F', 'D', 'S'];


let stacks2 = _.cloneDeep(stacks);
let answer = '';

instructions.forEach( (instruction) => {
    instruction.performInstructions(stacks);
});

for(let i = 0; i < stacks.length; i++){
    answer += stacks[i][stacks[i].length - 1];
} 
console.log(answer);




instructions.forEach( (instruction) => {
    instruction.performInstructionsNew(stacks2);
});

let answer2 = '';
for(let i = 0; i < stacks2.length; i++){
    answer2 += stacks2[i][stacks2[i].length - 1];
}
console.log(answer2);
