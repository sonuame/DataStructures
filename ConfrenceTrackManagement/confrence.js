
var moment = require('moment');
let config = {
    MorningTimeMins : 180,
    AfternoonMins : 240,
    ConfrenceMins : 420
}

module.exports.config = config;
module.exports.talk = function (id, title, mins){
    this.id = id;
    this.title = title;
    this.finalTitle = '';
    this.mins = mins;
    this.lunch = false;
    this.networkingTitle = '';
    this.networking = false;
    this.sessionTime = null;
    this.lunchTitle = null;
    this.trackTitle = null;
}

module.exports.confrence = function (talks) {
    this.tracks = talks;
    this.totalTrackMinutes = 0.0;
    this.totalTracks = talks.length;
    this.totalTalks = talks.length;
    this.tracks.forEach(element => { this.totalTrackMinutes += element.mins; });
    this.numberOfTracks = this.totalTrackMinutes/config.ConfrenceMins;
    this.schedule = [];

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

    this.SetTalkIntoTrack = function(track, start){
        //console.log(this.tracks.map(e=>e.title + ' ' + e.mins));
        let sumMorning = config.MorningTimeMins;
        let sumEvening = config.AfternoonMins;
        let startTime = moment("09:00 AM", "hh:mm a");
        let index = 0;
        
        for (index = start; index < this.tracks.length; index++) {
            let talk = this.tracks[index];
            //console.log(talk.title, talk.mins);
            if(sumMorning >= talk.mins){
                sumMorning -= talk.mins;
                let title = startTime.format('HH:mm A') + ' ' + talk.title + ' ' + talk.mins + 'mins';
                startTime.add(talk.mins, 'm');
                talk.trackTitle = title;
                this.schedule.push({
                    title : title,
                    track : (track + 1)
                });
            }
            
            if(sumMorning < talk.mins){
                break;
            }

            if(sumMorning > 0){
                continue;
            }

            if(sumMorning <= 0){
                break;
            }
        
        }

        let talk = this.tracks[index];
        talk.lunch = true;
        talk.lunchTitle = "12:00 PM" + " " + "Lunch";
        startTime.add(60, 'm');
        index++;
        this.schedule.push({
            title : talk.lunchTitle,
            track : (track + 1)
        });

        for (;index < this.tracks.length; index++) {
            talk = this.tracks[index];     
            
            if(sumEvening >= talk.mins){
                sumEvening -= talk.mins;
                let title = startTime.format('HH:mm A') + ' ' + talk.title + ' ' + talk.mins + 'mins';
                startTime.add(talk.mins, 'm');
                talk.trackTitle = title;
                this.schedule.push({
                    title : title,
                    track : (track + 1)
                });
            }

            if(sumEvening < talk.mins) break;
            if(sumEvening > 0) continue;
            if(sumEvening <= 0 ) break;
        }

        if(this.tracks.length === index)--index;
        talk.networking = true;
        talk.networkingTitle = "05:00 PM Networking Event";
        this.schedule.push({
            title : talk.networkingTitle,
            track : (track + 1)
        });
        
        index++;
        return index;
    }
}

