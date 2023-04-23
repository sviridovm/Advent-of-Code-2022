
const file = require('./file.js');


module.exports = class directory {

    directory(name) {
        this.name = name;
        this.files = []; 
        this.subdirectories = [];
        this.parent = null;
    }
    

    addFile(file) {
        this.files.push(file);
    }

    setParent(parent) {
        this.parent = parent;
    }


    addSubdirectory(subdirectory) {
        this.subdirectories.push(subdirectory);
    }

    getDirectoryName() {
        return this.name;
    }

        
    getDirectorySize() {
        let size = 0;
        for (let i = 0; i < this.files.length; i++) {
            size += this.files[i].getSize();
        }

        for (let i = 0; i < this.subdirectories.length; i++) {
            size += this.subdirectories[i].getDirectorySize();
        }
        return size;
    }   

};