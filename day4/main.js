const fs = require('fs');
const Range = require('./Range.js');
const _ = require('underscore');
const RangePair = require('./RangePair.js');


const text = fs.readFileSync('input.txt', 'utf8');
  
  
let pairByLine = text.toString().trim().split('\n');
let rangeLiterals = [];
for(let i = 0; i < pairByLine.length; i++){
    let line = pairByLine[i].split(',');
    rangeLiterals.push(line[0], line[1]);
}


let rangeArray = [];
for(let i = 0; i < rangeLiterals.length; i++){
    let range = rangeLiterals[i].split('-');
    rangeArray.push(new Range(Number(range[0]), Number(range[1])));
} 



let rangePairs = [];
for(let i = 0; i < rangeArray.length; i+=2){
    rangePairs.push(new RangePair(rangeArray[i], rangeArray[i+1]));
}

let count = 0;
for(let i = 0; i < rangePairs.length; i++){
    if(rangePairs[i].fullOverlap()){
        count++;
    }
}

console.log('Full overlap: ' + count);

count = 0;
for(let i = 0; i < rangePairs.length; i++){
    if(rangePairs[i].partialOverlap()){
        count++;
    }
}
console.log('Partial overlap: ' + count);


// OOP go brrr




