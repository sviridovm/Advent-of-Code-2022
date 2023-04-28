const fs = require('fs');
const { text } = require('stream/consumers');
const textByLine = fs.readFileSync('input.txt').toString().split("\n");



// make a 101 x101 grid with all values set to 0
const grid = Array(1001).fill(0).map(() => Array(1001).fill(0));
let [headRow, headCol, tailRow, tailCol] = Array(4).fill(500);

const updateHead = (direction, headRow, headCol) => {
    switch(direction){
        case 'U':
            headRow--;
            break;
        case 'D':
            headRow++;
            break;
        case 'L':
            headCol--;
            break;
        case 'R':
            headCol++;
            break;
    }
    return [headRow, headCol];
}

const updateTail = (headRow, headCol, tailRow, tailCol) => {
    const rowDiff = Math.abs(headRow-tailRow);
    const colDiff = Math.abs(headCol-tailCol);
    if((rowDiff > 1 && colDiff != 0) || (rowDiff != 0 && colDiff > 1)){
        tailRow += Math.sign(headRow-tailRow);
        tailCol += Math.sign(headCol-tailCol);
    } else if(rowDiff > 1){
        tailRow += Math.sign(headRow-tailRow);
    } else if(colDiff > 1){
        tailCol += Math.sign(headCol-tailCol);
    } 
    return [tailRow, tailCol];
}


textByLine.forEach((line) => {
    const vals = line.split(' ');
    const direction = vals[0];
    const steps = parseInt(vals[1]);

    for(let i = 0; i < steps; i++) {
        [headRow, headCol] = updateHead(direction, headRow, headCol);
        [tailRow, tailCol] = updateTail(headRow, headCol, tailRow, tailCol);
        grid[tailRow][tailCol] = 1;
    }
});

let count = 0;
grid.reduce((acc, row) => {
    count += row.reduce((acc, col) => {
        return acc + col;
    }, 0);
    return acc;
});
console.log(count);


// Part 2
const grid2 = Array(1001).fill(0).map(() => Array(1001).fill(0)); //represents where the tail has been
const ropePostions = Array(10).fill(0).map(() => Array(2).fill(500)); //coords of every part of the rope
[headRow, headCol, tailRow, tailCol] = ropePostions[0].concat(ropePostions[ropePostions.length-1]);
textByLine.forEach((line) => {
    const vals = line.split(' ');
    const direction = vals[0];
    const steps = parseInt(vals[1]);

    for(let i = 0; i < steps; i++) {
        [headRow, headCol] = updateHead(direction, headRow, headCol);
        ropePostions[0] = [headRow, headCol];

        for(let j = 0; j < ropePostions.length-1; j++){
            const [tempHeadRow, tempHeadCol] = ropePostions[j];
            const [tempTailRow, tempTailCol] = ropePostions[j+1];
            ropePostions[j+1] = updateTail(tempHeadRow, tempHeadCol, tempTailRow, tempTailCol);
        }
        [tailRow, tailCol] = ropePostions[ropePostions.length-1];
        grid2[tailRow][tailCol] = 1;
    }
    
});


count = 0;
grid2.reduce((acc, row) => {
    count += row.reduce((acc, col) => {
        return acc + col;
    }, 0);
    return acc;
});
console.log(count);