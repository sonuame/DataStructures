var fs = require('fs');
var extern = require('./confrence.js');
var contents = fs.readFileSync('./input.txt', 'utf8');
var courses = contents.split('\n');
var count = 0;
courses = courses.map(m=>{
    m = m.replace('\r','');
    let s = m.split(' ');
    let t = s[s.length-1].replace('min','');
    let c = new extern.talk(++count, m.replace(s[s.length-1], '').trim(), t === 'lightning' ? 5 : parseInt(t));
    return c;
});

let Confrence = new extern.confrence(courses);
count = 0;
for (let index = 0; index < Confrence.numberOfTracks; index++) {
    count = Confrence.SetTalkIntoTrack(index, count);        
}
console.log('Track 1:');
Confrence.schedule.filter(e=>e.track == 1).forEach(e=>console.log(e.title));
console.log();
console.log('Track 2:');
Confrence.schedule.filter(e=>e.track == 2).forEach(e=>console.log(e.title));