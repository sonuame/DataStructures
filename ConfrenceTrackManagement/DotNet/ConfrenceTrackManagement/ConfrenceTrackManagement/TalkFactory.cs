using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfrenceTrackManagement
{
    public class TalkFactory 
    {
        public static int ID = 0;
        public static Talk GetTalkInstance(string lineItem)
        {
            lineItem = lineItem.Replace("\r", "");
            string title = lineItem.Substring(0, lineItem.LastIndexOf(" ")).Trim();
            string time = lineItem.Substring(lineItem.LastIndexOf(" ")).Trim().Replace("min","");
            int mins = time == "lightning" ? 5 : int.Parse(time);
            return new Talk(++ID, title, mins);
        }

        public static Talk GetScheduledTalk(string title, int mins, int track)
        {
            Talk t = new Talk(++ID, title, mins);
            t.Track = track + 1;
            return t;
        }
    }
}
