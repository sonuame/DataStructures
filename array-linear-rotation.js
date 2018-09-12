var a = '1 2 3 4 5 6 7 8 9'.split(' ').map(aTemp => parseInt(aTemp, 10));
var d = 4;
var out = [];

for(i=d;i<a.length;i++){
    out.push(a[i]);
}

for(i=0;i<d;i++){
    out.push(a[i]);
}

console.log(out);