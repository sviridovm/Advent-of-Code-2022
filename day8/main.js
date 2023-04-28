const fs = require('fs');

const fileByLine = fs.readFileSync('input.txt', 'utf8').split('\n');
const grid = fileByLine.map((line) => line.split('').map((char) => Number(char)));
grid.pop(); // remove last empty line



const isVisibleTop = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = 0; i < row; i++) {
        if (currentHeight <= grid[i][col]) return false;
    }
    return true;
}


const isVisibleBottom = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = grid.length - 1; i > row; i--) {
        if (currentHeight <= grid[i][col]) return false;
    }
    return true;
}


const isVisibleLeft = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = 0; i < col; i++) {
        if (currentHeight <= grid[row][i]) return false;
    }
    return true;
}

const isVisibleRight = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = grid[0].length - 1; i > col; i--) {
        if (currentHeight <= grid[row][i]) return false;
    }
    return true;
}


let count = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
        if (isVisibleTop(grid, row, col) || isVisibleBottom(grid, row, col) || isVisibleLeft(grid, row, col) || isVisibleRight(grid, row, col)) {
            count++;
        }
    }
}


console.log(count);


// Part 2
//---------------------------------------------
const numVisibleAbove = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = row - 1; i >= 0; i--) {
        if (currentHeight <= grid[i][col]) return Math.abs(row - i);
    }
    return Math.abs(row);
}

const numVisibleBelow = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = row + 1; i < grid.length; i++) {
        if (currentHeight <= grid[i][col]) return Math.abs(row - i);
    }
    return Math.abs(row - (grid.length - 1));
}

const numVisibleLeft = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = col - 1; i >= 0; i--) {
        if (currentHeight <= grid[row][i])return Math.abs(col - i);
    }
    return Math.abs(col);
}

const numVisibleRight = (grid, row, col) => {
    const currentHeight = grid[row][col];
    for (let i = col + 1; i < grid[0].length; i++) {
        if (currentHeight <= grid[row][i]) return Math.abs(col - i);
    }
    return Math.abs(col - (grid[0].length - 1));
}

let scenicScores = [];
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
        const scenicScore = numVisibleAbove(grid, row, col) * numVisibleBelow(grid, row, col) * numVisibleLeft(grid, row, col) * numVisibleRight(grid, row, col);
        scenicScores.push(scenicScore);
        
    }
}


const maxScenicScore = Math.max(...scenicScores);
console.log(maxScenicScore);
//const int = 8 * 20 * 47 * 51;
//console.log(int);