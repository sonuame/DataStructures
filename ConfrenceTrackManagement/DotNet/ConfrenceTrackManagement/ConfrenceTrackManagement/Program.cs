using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfrenceTrackManagement
{
    class Program
    {
        static void Main(string[] args)
        {
            Confrence confrence = new Confrence("input.txt", DateTime.Now);
            
            int index = 0;
            for (int i = 0; i < confrence.TotalTracks; i++)
            {
                index = confrence.ScheduleTalks(index, i);
            }
            Console.WriteLine("Track 1: ");
            Array.ForEach(confrence.ScheduledTalks.Where(m=>m.Track == 1).ToArray(), m =>
            {
                Console.WriteLine(m.ScheduledDate.ToShortDateString() + "\t\t" + m.Title + "\t\t");
            });
            Console.WriteLine();
            Console.WriteLine("Track 2: ");
            Array.ForEach(confrence.ScheduledTalks.Where(m => m.Track == 2).ToArray(), m =>
            {
                Console.WriteLine(m.ScheduledDate.ToShortDateString() + "\t\t" +  m.Title + "\t\t");
            });
            Console.ReadKey();
        }
    }
}
