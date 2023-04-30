const { test } = require("node:test");


module.exports = class {

     

    constructor(name, items, operation, test, recipients) {
        this.name = name;
        this.operatorConverter = {
            '+': function (x, y) { return x + y },
            '-': function (x, y) { return x - y },
            '*': function (x, y) { return x * y},
            '/': function (x, y) { return x / y},
        };
        this.monkeyNumber = name;
        this.items = items;
        this.operation = operation;
        this.operate = (val1) => {
            let val2;
            if( operation[2] == 'old'){
                val2 = val1;
            } else {
                val2 = Number(operation[2]);
            }
            return this.operatorConverter[operation[1]](val1, Number(val2));
        }
        this.testNum = test;
        this.performTest = (val) => val % this.testNum == 0; 
        this.recipients = recipients;
        this.inspectedCount = 0;
    }

    getMonkeyNumber() {
        return this.monkeyNumber;
    }

    getItems() {
        return this.items;
    }

    getOperation() {
        return this.operation;
    }

    getTest() {
        return this.test;
    }

    inspectItems() {
        const itemSender = [];
        this.items.forEach( (item) => {
            this.inspectedCount++;
            let worryLevel = this.operate(item);
            worryLevel = Math.floor(worryLevel/3);
            if(this.performTest(worryLevel)){
                itemSender.push([this.recipients[0], worryLevel]);
            } else {
                itemSender.push([this.recipients[1], worryLevel]);
            }
        });
        this.items = [];
        return itemSender;
    }

    addItem(item){
        this.items.push(item);
    }

    inspectItemsNew(lcm) {
        const itemSender = [];
        this.items.forEach( (item) => {
            this.inspectedCount++;
            let worryLevel = this.operate(item);
            worryLevel = Math.floor(worryLevel%lcm);
            if(this.performTest(worryLevel)){
                itemSender.push([this.recipients[0], worryLevel]);
            } else {
                itemSender.push([this.recipients[1], worryLevel]);
            }
        });
        this.items = [];
        return itemSender;
    }

}