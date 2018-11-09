
var moment = require('moment');
let config = {
    MorningTimeMins : 180,
    AfternoonMins : 240,
    ConfrenceMins : 420
}
module.exports.config = config;

module.exports.confrence = function (talks) {
    this.tracks = talks;
    this.totalTrackMinutes = 0.0;
    this.totalTracks = talks.length;
    this.totalTalks = talks.length;
    this.tracks.forEach(element => { this.totalTrackMinutes += element.mins; });
    this.numberOfTracks = this.totalTrackMinutes/config.ConfrenceMins;

    this.decimalPart = this.numberOfTracks % 1;
    this.integerPart = this.numberOfTracks - this.decimalPart;
    this.leftMins = this.totalTrackMinutes - (this.integerPart * config.ConfrenceMins);

    if(this.leftMins > 0){
        this.numberOfTracks = this.integerPart + 1;
    }
    else{
        this.numberOfTracks = this.integerPart;
    }

    this.totalTracks = this.numberOfTracks;
    this.tracks = this.tracks.sort((a,b)=>{
        return b.mins-a.mins;
    })

    this.SetTalkIntoTrack = function(){
        let count = 0;
        for (let count = 0; count < this.tracks.length; count++) {
            const element = this.tracks[count];
            
        }
    }
























}

module.exports.talk = function (id, title, mins){
    this.id = id;
    this.title = title;
    this.mins = mins;
    this.lunch = false;
    this.networkingTitle = '';
    this.networking = false;
    this.sessionTime = null;
    this.lunchTitle = null;
    this.trackTitle = null;
}

