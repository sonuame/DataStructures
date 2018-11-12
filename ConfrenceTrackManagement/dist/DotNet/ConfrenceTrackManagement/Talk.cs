using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfrenceTrackManagement
{
    public class Talk
    {
        private int _iD;
        private int _track;
        private string _title;
        private int _time;

        public int ID { get => _iD; set => _iD = value; }
        public int Track { get => _track; set => _track = value; }
        public string Title { get => _title; set => _title = value; }
        public int Time { get => _time; set => _time = value; }

        public Talk(int id, string title, int time)
        {
            this.ID = id;
            this._title = title;
            this._time = time;
        }
    }
}
