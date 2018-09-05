var s = [
    [1],
    [3, 6],
    [2, 4, 6],
    [1, 6, 8, 0],
    [2, 3, 1, 7, 0],
    [1, 4, 5, 6, 3, 8],
    [4, 5, 3, 2, 6, 7, 1]
];
var path = [[],[]];
var sum = 0;
var last = 0;

var p = function (i) {
    if (i < s.length - 1) {
        var e1 = s[i];
        var e2 = s[i + 1];
        if (i == 0){ 
            last = e1[0];
            path[0].push(last);
        }

        var j = e1.indexOf(last);
        if(j > -1){
            var a = [e1[j], e2[j]];
            var b = [e1[j], e2[j + 1]];
            if (a[0] == last && b[0] == last) {
                if (a[0] + a[1] > b[0] + b[1]) {
                    last = a[1];
                    path[0].push(last);
                    
                    sum += a[0] + a[1];
                } else {
                    last = b[1];
                    path[0].push(last);
                    
                    sum += b[0] + b[1];
                }
            }
        }
        i++;
        p(i);
    }
}

p(0);

console.log(sum);
console.log(path[0]);