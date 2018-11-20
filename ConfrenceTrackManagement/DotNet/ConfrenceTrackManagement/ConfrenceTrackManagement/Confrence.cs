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
        private int _morningMins;
        private int _eveningMins;

        public int MorningMins { get => _morningMins; set => _morningMins = value; }
        public int EveningMins { get => _eveningMins; set => _eveningMins = value; }

        public int TotalTrackMins { get => _totalTrackMins; set => _totalTrackMins = value; }

        public List<ErrorModel> errors { get; set; }

        public int TotalTracks { get => _totalTracks; set => _totalTracks = value; }
        public List<Talk> Talks { get => talks; set => talks = value; }
        public List<Talk> ScheduledTalks { get => scheduledTalks; set => scheduledTalks = value; }

        public Confrence(DateTime date)
        {
            errors = new List<ErrorModel>();
            talks = new List<Talk>();
            startTime = date.Date.AddHours(9);
            this.MorningMins = TOTAL_MORNING_MINS;
            this.EveningMins = TOTAL_AFTERNOON_MINS;
        }

        public async Task<string[]> ReadFile(string FilePath)
        {
            string content = string.Empty;
            return await Task.Run<string[]>(() =>
            {
                using (StreamReader sr = new StreamReader(FilePath)) content = sr.ReadToEnd();
                return content.Split('\n');
            });
        }


        internal void ReadTalks(string[] data)
        {
            talks = new List<Talk>();
            Array.ForEach(data, m =>
            {
                talks.Add(TalkFactory.GetTalkInstance(m));
            });
            talks.Sort(new TalkCompare());
            if (talks.Count > 0)
            {
                this._totalTrackMins = talks.Sum(m => m.Time);
                int totalMins = (TOTAL_MORNING_MINS + TOTAL_AFTERNOON_MINS);
                double totalTracks = Math.Ceiling((_totalTrackMins * 1.0) / totalMins);
                this._totalTracks = (int)totalTracks;
            }
        }

        public Talk GetAvailable(int duration)
        {

        }

        public int ScheduleTalks(int start, int track)
        {
            startTime = startTime.AddDays(track).Date.AddHours(9);
            ScheduledTalks = ScheduledTalks ?? new List<Talk>();
            TalkFactory.ID = start == 0 ? 0 : TalkFactory.ID;
            this.MorningMins = TOTAL_MORNING_MINS;
            this.EveningMins = TOTAL_AFTERNOON_MINS;
            Talk talk = null;
            int index = start;
            // Process Morning Schedule
            index = ProcessMorningSession(index, track);
            index = ProcessEveningSession(index, track);

            if (this.talks.Count == index) --index;

            index++;
            ScheduledTalks.Add(TalkFactory.GetScheduledTalk("05:00 PM Networking Event", 0, track, startTime.Date.AddHours(17)));
            return index;
        }

        int ProcessMorningSession(int start, int track)
        {
            int index = start;

            for (index = start; index < this.talks.Count; index++)
            {
                Talk talk = this.talks[index];
                if (this.MorningMins >= talk.Time)
                {
                    this.MorningMins -= talk.Time;
                    string Title = startTime.ToString("hh:mm tt ").ToUpper() + talk.Title + " " + talk.Time + "min";
                    startTime = startTime.AddMinutes(talk.Time);
                    talk.Track = track + 1;
                    talk.ScheduledDate = startTime.AddMinutes(-talk.Time);
                    talk.Title = Title;
                    ScheduledTalks.Add(talk);
                }

                if (this.MorningMins < talk.Time) break;
                if (this.MorningMins > 0) continue;
                if (this.MorningMins <= 0) break;
            }

            startTime = startTime.AddMinutes(30);
            ScheduledTalks.Add(TalkFactory.GetScheduledTalk("12:30 PM" + " " + "Lunch", 0, track, startTime.Date.AddHours(12.5)));
            index++;
            return index;
        }

        int ProcessEveningSession(int start, int track)
        {
            int index = start;
            for (; index < this.talks.Count; index++)
            {
                Talk talk = this.talks[index];
                if (this.EveningMins >= talk.Time)
                {
                    this.EveningMins -= talk.Time;
                    string Title = startTime.ToString("hh:mm tt ").ToUpper() + talk.Title + " " + talk.Time + "min";
                    startTime = startTime.AddMinutes(talk.Time);
                    talk.Title = Title;
                    talk.ScheduledDate = startTime.AddMinutes(-talk.Time);
                    talk.Track = track + 1;
                    ScheduledTalks.Add(talk);
                }

                if (this.EveningMins < talk.Time) break;
                if (this.EveningMins > 0) continue;
                if (this.EveningMins <= 0) break;
            }
            return index;
        }




    }
}
