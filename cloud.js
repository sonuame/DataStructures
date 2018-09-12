function jumpingOnClouds(c) {
    var n = 0;
    var i = 0;
    while(i < c.length){
        var x = c[i];
        var y = c[i+1] == undefined ? 1 : c[i+1];
        var z = c[i+2] == undefined ? 1 : c[i+2];
        
        if(x == 0 && z == 0)
        {
            n++;
            i = i + 2;
        }
        else if(x == 0 && y == 0 && z == 1){
            n++;
            i = i + 1;
        }
        else{
            i++;
        }
    }
    return n;
}

console.log(jumpingOnClouds('0 0 1 0 0 1 0'.split(' ').map(cTemp => parseInt(cTemp, 10))));