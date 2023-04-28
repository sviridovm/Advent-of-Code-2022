
const file = require('./file.js');


module.exports = class directory {

    constructor(name) {
        this.name = name;
        this.files = []; 
        this.subdirectories = [];
        this.parent = null;
        this.fileTotal = 0;

    }
    

    addFile(file) {
        this.files.push(file);
        this.fileTotal += file.getSize();
    }

    setParent(parent) {
        this.parent = parent;
    }

    getParent() {
        return this.parent;
    }


    addSubdirectory(subdirectory) {
        this.subdirectories.push(subdirectory);
    }

    getDirectoryName() {
        return this.name;
    }

        
    getDirectorySize() {
        let size = 0;
        size += this.fileTotal;
        this.subdirectories.forEach( (subdirectory) => size += subdirectory.getDirectorySize());
        return size;
    }   

    getDirectorySize(limit, arr){
        let size = this.getDirectorySize();
        if(size <= limit){
            arr.push(size);
            }
        this.subdirectories.forEach( (subdirectory) => size += subdirectory.getDirectorySize(limit, arr));
        
        return size;
    }


    getNumSubdirectories() {
        return this.subdirectories.length + this.subdirectories.reduce( (acc, subdirectory) => acc + subdirectory.getNumSubdirectories(), 0);
    }

    print(size) {
        console.log(this.name + ' ' + size);
    }

    printDirectoryStructure(previousPrints, arr) {
        let spacing = ' '.repeat(previousPrints) + '-';
        if(this.getDirectorySize() < 100000){
        console.log(spacing + this.name + ' ' + this.getDirectorySize());
        arr.push(this.getDirectorySize())
        }
        this.subdirectories.forEach( (subdirectory) => subdirectory.printDirectoryStructure(previousPrints + 1, arr));
        
    }


    generateDeleteList(maxSpace, usedSpace, unusedSpaceTarget, deleteList) {
        const currentUnusedSpace = maxSpace - usedSpace;
        const dirSize = this.getDirectorySize();
        if(currentUnusedSpace + dirSize >= unusedSpaceTarget){
            deleteList.push(dirSize);
        }
        this.subdirectories.forEach( (subdirectory) => subdirectory.generateDeleteList(maxSpace, usedSpace, unusedSpaceTarget, deleteList));
        return deleteList;
    }

};

