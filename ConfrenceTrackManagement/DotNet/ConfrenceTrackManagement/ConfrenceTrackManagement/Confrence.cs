using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfrenceTrackManagement
{
    public class Confrence
    {
        public const int TOTAL_MORNING_MINS = 180;
        public const int TOTAL_AFTERNOON_MINS = 240;

        private List<Talk> talks;
        private List<Talk> scheduledTalks;
        DateTime startTime;

        private int _totalTracks;
        private int _totalTrackMins;

        public int TotalTrackMins { get => _totalTrackMins; set => _totalTrackMins = value; }

        public List<ErrorModel> errors { get; set; }

        public int TotalTracks { get => _totalTracks; set => _totalTracks = value; }
        public List<Talk> Talks { get => talks; set => talks = value; }
        public List<Talk> ScheduledTalks { get => scheduledTalks; set => scheduledTalks = value; }

        public Confrence(string filepath, DateTime date)
        {
            errors = new List<ErrorModel>();
            talks = new List<Talk>();
            startTime = date.Date.AddHours(9);
            try
            {
                string content = string.Empty;
                using (StreamReader sr = new StreamReader(filepath)) content = sr.ReadToEnd();
                string[] lines = content.Split('\n');
                ProcessTalks(lines);

                if (talks.Count > 0)
                {
                    this._totalTrackMins = talks.Sum(m => m.Time);
                    int totalMins = (TOTAL_MORNING_MINS + TOTAL_AFTERNOON_MINS);
                    double totalTracks = Math.Ceiling((_totalTrackMins * 1.0) / totalMins);
                    this._totalTracks = (int)totalTracks;
                }
            }
            catch (Exception ex)
            {
                errors.Add(new ErrorModel
                {
                    ErrorMessage = ex.Message,
                    Time = DateTime.Now
                });
            }
        }

        private void ProcessTalks(string[] data)
        {
            talks = new List<Talk>();
            Array.ForEach(data, m =>
            {
                talks.Add(TalkFactory.GetTalkInstance(m));
            });
            talks.Sort(new TalkCompare());
        }

        public int ScheduleTalks(int start, int track)
        {
            startTime = startTime.AddDays(track).Date.AddHours(9);
            ScheduledTalks = ScheduledTalks ?? new List<Talk>();
            TalkFactory.ID = start == 0 ? 0 : TalkFactory.ID;
            int morningMins = TOTAL_MORNING_MINS;
            int eveningMins = TOTAL_AFTERNOON_MINS;
            Talk talk = null;
            int index = 0;
            // Process Morning Schedule
            for (index = start; index < this.talks.Count; index++)
            {
                talk = this.talks[index];
                if(morningMins >= talk.Time)
                {
                    morningMins -= talk.Time;
                    string Title = startTime.ToString("hh:mm tt ").ToUpper() + talk.Title + " " + talk.Time + "min";
                    startTime = startTime.AddMinutes(talk.Time);
                    ScheduledTalks.Add(TalkFactory.GetScheduledTalk(Title, talk.Time, track, startTime.AddMinutes(-talk.Time)));
                }

                if (morningMins < talk.Time) break;
                if (morningMins > 0) continue;
                if (morningMins <= 0) break;
            }

            startTime = startTime.AddMinutes(60);
            ScheduledTalks.Add(TalkFactory.GetScheduledTalk("12:00 PM" + " " + "Lunch", 0, track, startTime.Date.AddHours(12)));
            index++;

            for(; index < this.talks.Count; index++)
            {
                talk = this.talks[index];
                if (eveningMins >= talk.Time)
                {
                    eveningMins -= talk.Time;
                    string Title = startTime.ToString("hh:mm tt ").ToUpper() + talk.Title + " " + talk.Time + "min";
                    startTime = startTime.AddMinutes(talk.Time);
                    ScheduledTalks.Add(TalkFactory.GetScheduledTalk(Title, talk.Time, track, startTime.AddMinutes(-talk.Time)));
                }

                if (eveningMins < talk.Time) break;
                if (eveningMins > 0) continue;
                if (eveningMins <= 0) break;
            }

            if (this.talks.Count == index) --index;

            index++;
            ScheduledTalks.Add(TalkFactory.GetScheduledTalk("05:00 PM Networking Event", 0, track, startTime.Date.AddHours(17)));
            return index;
        }




    }
}
