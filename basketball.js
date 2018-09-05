let scores = "10 5 20 20 4 5 2 25 1".split(' ');
let i = 0;
let num = [0,0]; // min, mx
let b = 0;
let w = 0;
for (let i = 0; i < scores.length; i++) {
    const e = parseInt(scores[i]);
    if(i==0){
        num[0] = e;
        num[1] = e;
    }else{
        if(e >= num[1]){
            if(e > num[1])b++;
             num[1] = e;
        }
        else{
            if(e < num[0]) w++;
             num[0] = e > num[0] ? num[0] : e;
        }
    }
}
return [b,w];