

class Instructions {

    constructor(quantity, begin, end){

        this.quantity = quantity;
        this.begin = begin;
        this.end = end;

    }


    performInstructions(stacks){
        for(let i = 0; i < this.quantity; i++){
            stacks[this.end].push(stacks[this.begin].pop());
        }
    }

    performInstructionsNew(stack){
        if( typeof stack[this.begin] === 'undefined' || typeof stack[this.end] === 'undefined'){
            console.log(stack);
            console.log(this.begin);
        }
        if (this.quantity > stack[this.begin].length) {
            this.quantity = stack[this.begin].length;
        }
        let temp = stack[this.begin].slice(stack[this.begin].length - this.quantity);
        stack[this.begin] = stack[this.begin].slice(0, stack[this.begin].length - this.quantity);
        stack[this.end] = stack[this.end].concat(temp);
    }

}


module.exports = Instructions;
