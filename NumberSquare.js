var num = [];
for(i=1;i<=25;i++) num.push(i);

var thresh = Math.floor(num.length/2);

var sum = 0;
var inc = -1;

var rec = function(_sum, _inc){
    _inc += 2;
    _sum += _inc;
    console.log(_inc)
    if(_sum < thresh) rec(_sum, _inc);
    console.log(_inc)
} 

rec(0,-1);
