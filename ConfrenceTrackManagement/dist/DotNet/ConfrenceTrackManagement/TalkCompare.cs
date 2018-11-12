using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfrenceTrackManagement
{
    public class TalkCompare : IComparer<Talk>
    {
        public int Compare(Talk x, Talk y)
        {
            return y.Time - x.Time;
        }
    }
}
