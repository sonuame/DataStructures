var n = 8;
var s = 'UDDDUDUU';

var j = 0;
var k = 0;
var v = 0;
for (var i = 0; i < n; i++) {
    if (s[i] == 'U') k++;
    if (s[i] == 'D') k--;
    console.log(k,s[i-1]);
    if(k==0 && s[i] == 'U') v += 1;
}

console.log(v);