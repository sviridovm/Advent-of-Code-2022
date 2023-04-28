const fs = require('fs');

let text = fs.readFileSync('input.txt', 'utf8');
const arr = text.split('');




for(let i = 3; i < arr.length; i++){
    
    let uSet = new Set();
    for(let j = i - 3; j <= i; j++){
        uSet.add(arr[j]);
    }

    
    if(uSet.size == 4){
        console.log(i+1);
        break;
    }
}

for(let i = 13; i < arr.length; i++){
    let messageSet = new Set();
    for(let a = i - 13; a <= i; a++){
            if(messageSet.has(arr[a])){
                break;
            } else {
                messageSet.add(arr[a]);
            }
    }

    if(messageSet.size == 14){
        console.log(i + 1);
        break;
    }
}


