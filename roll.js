function rollTheString(s, roll) {
    // Write your code here
    // roll = [1,2,3,4,5]
    var char = []
    for (let i = 0; i < roll.length; i++){
        for (let j = 0; j < roll[i]; j++){
            let tmp = s.split('');
            tmp[j] = nextChar(s[j])
            s =  tmp.join('');
        }
    }
    return s;
}

function nextChar(c) {
    let code = c.toString().charCodeAt(0);
    let newCode = code + 1;
    if (code > 64 && code <= (64 + 26)) {
        newCode = newCode > (64 + 26) ? 65 : newCode;
    }
    else if (code > 96 && code <= (96 + 26)) {
        newCode = newCode > (96 + 26) ? 97 : newCode;
    }
    return String.fromCharCode(newCode);
}

console.log(rollTheString('vwxyz', [1,2,3,4,5]));