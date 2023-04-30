const fs = require('fs');
const Monkey = require('./monkey.js');

const data = fs.readFileSync('input.txt', 'utf8');
let splitted = data.split(/\n\s*\n/)
const monkeyData = [];
splitted.forEach((capture) => monkeyData.push(capture));
const parsedMonkeys = monkeyData.map((monkey) => monkey.split(/\n/));



const createMonkeys = (parsedMonkeys) => {
const monkeys = [];
parsedMonkeys.forEach((monkey) => {
    const name = monkey[0];
    const items = monkey[1].slice(monkey[1].indexOf(':') + 1).split(',').map((item) => Number(item));
    const operation = monkey[2].slice(monkey[2].indexOf('=') + 2).split(' ');
    const divisibleBy = monkey[3].split(' ').pop();
    const trueCase = monkey[4].split(' ').pop();
    const falseCase =  monkey[5].split(' ').pop();
    const recipients = [trueCase, falseCase].map( (item) => Number(item));
    const newMonkey = new Monkey(name, items, operation, divisibleBy, recipients);
    monkeys.push(newMonkey);
});
return monkeys;
}

const monkeys = createMonkeys(parsedMonkeys);

for(let round = 0; round < 20; round++){
    monkeys.forEach((monkey) => {
        const throws = monkey.inspectItems();
        throws.forEach((arr) => {
            const recipient = arr[0];
            const item = arr[1];
            monkeys[recipient].addItem(item);
        });
    });
    
}

let itemsInspected = monkeys.map((monkey) => monkey.inspectedCount);


itemsInspected = itemsInspected.sort((a, b) => b-a);
const monkeyBusiness = itemsInspected[0] * itemsInspected[1];
console.log(monkeyBusiness);


// Part 2
const monkeys2 = createMonkeys(parsedMonkeys);
const lcm = monkeys2.map((monkey) => monkey.testNum).reduce((a, b) => a * b);

for(let round = 0; round < 10000; round++){
    monkeys2.forEach((monkey) => {
        const throws = monkey.inspectItemsNew(lcm); // pass in lcm. remainder of lcm will reduce number but will still have same divisibility as original number
        throws.forEach((arr) => {
            const recipient = arr[0];
            const item = arr[1];
            monkeys2[recipient].addItem(item);
        });
    });
}

let itemsInspected2 = monkeys2.map((monkey) => monkey.inspectedCount);
itemsInspected2 = itemsInspected2.sort((a, b) => b - a);
const monkeyBusiness2 = itemsInspected2[0] * itemsInspected2[1];
console.log(monkeyBusiness2);



