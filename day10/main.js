const { sign } = require('crypto');
const fs = require('fs');

const textByLine = fs.readFileSync('input.txt').toString().split("\n");

const register = [];
let x = 1;

textByLine.forEach((line) => {
    const vals = line.split(' ');
    const action = vals[0];
    if(action == 'addx'){
        register.push(x);
        register.push(x);
        x += parseInt(vals[1]);
    }
    if(action == 'noop'){
        register.push(x);
    }
});

const signalStrength = (cycle, register) => register[cycle-1] * cycle;
const total = signalStrength(20, register)
+ signalStrength(60, register) 
+ signalStrength(100, register)
+ signalStrength(140, register)
+ signalStrength(180, register)
+ signalStrength(220, register);    

console.log(total);

const draw = (register, beginPos, length) => {
    let str = '';
    for(let i = 0; i < length; i++){
        const cycle = beginPos + i -1;
        const vals = [register[cycle] - 1, register[cycle], register[cycle] + 1];
        if(vals.includes(i)){
            str += '#';
        } else {
            str += '.';
        }
    }
    return str;
}


const str1 = draw(register, 1, 40);
const str2 = draw(register, 41, 40);
const str3 = draw(register, 81, 40);
const str4 = draw(register, 121, 40);
const str5 = draw(register, 161, 40);
const str6 = draw(register, 201, 40);
const picture = [str1, str2, str3, str4, str5, str6];
picture.forEach((str) => console.log(str));
