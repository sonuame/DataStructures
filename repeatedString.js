function repeatedString(s, n) {
    var N = findA(s);
    var Q = Math.floor(n/s.length);
    N = Q * N;   
    Q = n % s.length;
    N += findA(s,Q);
    return N;
}

function findA(s, stop){
  var n = 0;
  for(var i=0;i<s.length;i++){
      if(i==stop) break;
      else
        n += (s[i]=='a' ? 1 : 0);
  }
  return n;
}

console.log(repeatedString('aba',10));