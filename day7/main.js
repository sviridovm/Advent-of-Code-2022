const fs = require('fs');
const file = require('./file.js');
const directory = require('./directory.js');


const input = fs.readFileSync('input.txt', 'utf8');
let fileByLine = input.split('\n').map( (line) => {
    line.at(0) == '$' ? line = line.slice(2) : line;  // get rid of the $ at the beginning of each line
    return line;
});



let currentDirectory = new directory('/');
let directories = [];
directories.push(currentDirectory);
for(let i = 1; i < fileByLine.length; i++) {
    let line = fileByLine[i];
    let lineBySpace = line.split(' ');
    let beginOfLine = lineBySpace[0];
    let name = lineBySpace[1];
    if(beginOfLine == 'cd') {
        if(name== '..') {
            currentDirectory = currentDirectory.parent;
            console.log('went to parent' + currentDirectory.name);
        } else if(directories.map((directory) => directory.getDirectoryName()).includes(name)) {
            currentDirectory = directories[name];
        }
    } else if (beginOfLine == 'dir') {
        let newDirectory = new directory(name); // newDirectory returns undefined
        console.log(name); // returns expected value
        console.log(newDirectory.getDirectoryName()); // returns undefined
        directories.push(newDirectory);
        newDirectory.setParent(currentDirectory);
        currentDirectory.addSubdirectory(newDirectory);
        currentDirectory = newDirectory;
    } else if (typeof beginOfLine == 'number') {
        currentDirectory.addFile(new file.file(name, beginOfLine));
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


console.log(directories.length);
directories.forEach( (directory) => {
   // directory.getDirectorySize() > 0 ? console.log(directory.name) : null;
   console.log(directory.name);
});