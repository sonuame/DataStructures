var data = [[1],[2,3],[4,6,3],[2,7,8,1],[7,3,2,5,1]];
// paths = 2 ^ n-1 = 16
var n = 5;
var sum = {
    high : [],
    low : []
}
var last = 0;
for (let i = 0; i < data.length; i++) {
    const e = data[i]; // i = 0, e = 1
    if(data[i+1] != undefined){
        for (let i2 = 0; i2 < e.length; i2++) {
            const e2 = e[i2];
            var a = data[i+1][i2];
            var b = data[i+1][i2 + 1];
            
            if((e2 + a) > (e2 + b) ){
                sum.high.push(e2);
                sum.low.push(a);
            }
            else{
                sum.high.push(e2);
                sum.high.push(b);
            }

            console.log(e2 + "\t" + a + "\t" + b);        
        }
    }
    else{

    }
}

console.log(sum.high);