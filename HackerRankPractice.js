var data  = "4".split(' ').map(sTemp => parseInt(sTemp, 10));
var i = 0;
var c = 0;
var d = 3;
var m = 2;

function sum(s, _i, m){
    var _sum = 0; // s = 1 2 1 3 2, d = 3, m = 2
    while(m > 0){
        _sum += data[_i];
        _i++;
        m--;
    }
    return _sum;
}

while(i < data.length){
    var s = sum(data, i, m);
    if(s == d)c++;
    i++;
}

console.log(c);