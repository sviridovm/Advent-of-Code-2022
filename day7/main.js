const fs = require('fs');
const file = require('./file.js');
const directory = require('./directory.js');


const input = fs.readFileSync('input.txt', 'utf8');
let fileByLine = input.split('\n').map( (line) => {
    line.at(0) == '$' ? line = line.slice(2) : line;  // get rid of the $ at the beginning of each line
    return line;
});


let root = new directory('/');
let currentDirectory = root;
let directories = []; // all directories in root
currentDirectory.subdirectories = directories;
//directories.push(currentDirectory);
for(let i = 1; i < fileByLine.length; i++) {
    const line = fileByLine[i];
    const lineBySpace = line.split(' ');
    const beginOfLine = lineBySpace[0];
    const name = lineBySpace[1];
    if(beginOfLine == 'cd') {
        if(name == '..') {
                currentDirectory = currentDirectory.getParent();
        } else if (name == '/') {
            currentDirectory = root;
        } else if(currentDirectory.subdirectories.map((directory) => directory.getDirectoryName()).includes(name)) { // if the name is in the subdirectories
            
            let temp = currentDirectory.subdirectories.filter( (directory) => directory.getDirectoryName() == name)[0]; // get the directory with the name
            temp.setParent(currentDirectory);   
            currentDirectory = temp;
        } 
    } else if (beginOfLine == 'dir') {
        let newDirectory = new directory(name);
        newDirectory.setParent(currentDirectory);
        newDirectory.getParent().addSubdirectory(newDirectory);
        
    } else if (!isNaN(beginOfLine)) {
        currentDirectory.addFile(new file(name, Number(beginOfLine)));
    }
    
}


// function directoryFactory(line, currentDirectory) {
//     let lineBySpace = line.split(' ');
//     let beginOfLine = lineBySpace[0];
//     let name = lineBySpace[1];
//     if (beginOfLine == 'ls') {
//         return null;
//     }

//     if(beginOfLine == 'cd') {
//         let name = lineBySpace[1];
//         if(name== '..') {
//             currentDirectory = currentDirectory.parent;
//         }
//         if(directories.includes(name)) {
//             currentDirectory = directories[name];
//         }
//     }

//     if (beginOfLine == 'dir') {
//         return new directory.directory(name);
//     }

//     if (typeof beginOfLine == 'number') {
//         currentDirectory.addFile(new file.file(name, beginOfLine));
//         return null;
//     }

// }
const limit = 100000;
let arr = [];
root.printDirectoryStructure(0, arr);
const sum = arr.reduce( (a, b) => Number(a) + Number(b), 0);
console.log(sum);

let deleteList = [];
const maxSpace = 70000000;
const usedSpace = root.getDirectorySize();
const spaceTarget = 30000000;
root.generateDeleteList(maxSpace, usedSpace, spaceTarget, deleteList);

const smallestDeletableFileSize = Math.min(...deleteList);
console.log(smallestDeletableFileSize);