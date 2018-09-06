var data = [9773 ,4838 ,5009 ,1534 ,1901 ,9763 ,5661 ,9425 ,1644 ,8679 ,219 ,8397 ,8513 ,7656 ,8604 ,6578 ,882 ,6237 ,8511 ,5919 ]
var swapped = true;
var d_backup = data;
while (swapped) {
    for (let i = 0; i < data.length; i++) {
        let a = data[i];
        let b = 0;
        if (i < data.length - 1) {
            b = data[i + 1];
            if (a > b) {
                data[i] = b;
                data[i + 1] = a;
                swapped = true;
                break;
            } else {
                swapped = false;
            }
        }
    }
}

function test(){
    var res = true;
    for (let i = 0; i < d_backup.length; i++) {
        if(data.indexOf(d_backup[i]) == -1) {
            res = false;
            break;
        }                
    }
    return res;
}

console.log(test());
console.log(data);