'use strict'

var data = '';
/*
data += '1 1 1 0 0 0' + '\n';
data += '0 1 0 0 0 0' + '\n';
data += '1 1 1 0 0 0' + '\n';
data += '0 0 2 4 4 0' + '\n';
data += '0 0 0 2 0 0' + '\n';
data += '0 0 1 2 4 0';
*/

data += '-1 1 -1 0 0 0' + '\n';
data += '0 -1 0 0 0 0' + '\n';
data += '-1 -1 -1 0 0 0' + '\n';
data += '0 -9 2 -4 -4 0' + '\n';
data += '-7 0 0 -2 0 0' + '\n';
data += '0 0 -1 -2 -4 0';



let arr = Array(data.split('\n').length);
for (let i = 0; i < arr.length; i++) {
    arr[i] = data.split('\n')[i].split(' ').map(arrTemp => parseInt(arrTemp, 10));
}

console.log(hourglassSum(arr));

function hourglassSum(arr) {
    let i = arr[0].length;
    let j = arr.length;
    let totalX = (i - 3 + 1); //3 is the i of hourglass
    let totalY = (j - 3 + 1); //3 is the j of hourglass
    let sum = 0.0;

    for (i = 0; i < totalX * totalY; i++) {
        var res = GetHourGlass(arr,i+1,totalX,totalY);
        //console.log(res);
        if(i == 0 || res > sum) sum = res;
    }
    return sum;
}

function GetHourGlass(arr, no, TotalX, TotalY){
    var x = Math.ceil(no/TotalX);
    var y = no % TotalX;
    y = y == 0 ? TotalY : y;
    var sum = 0;
    var items = [];

    for(var k=x;k<x+3;k++)
        for(var l=y;l<y+3;l++){
            items.push(arr[k-1][l-1]);
            if(k==(x+1) && (l==y||l==y+2)){

            }else{
                sum += arr[k-1][l-1];
            }
        }
    console.log(items);
    return sum;
}