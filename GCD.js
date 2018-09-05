var a = 45;
var b = 54;
var s = [];
var h = 1;

var fn = function(a,b){
    var h = 1;
    for (let i = 1; i <= a; i++) {
        if(a % i == 0){
            s.push(i);
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        if(b % s[i] === 0) h = s[i];
    }
    return h;
}

var f2 = function(a,b){ //560, 235
    while (b > 0) {
        let temp = b; //temp = 235
        b = a % b; // b = 560 % 235 = 
        a = temp // a = 235;
    }
    return a;
}

var res = f2(230,255)
console.log(res);