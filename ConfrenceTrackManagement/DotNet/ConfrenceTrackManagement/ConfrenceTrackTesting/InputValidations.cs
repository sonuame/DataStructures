using ConfrenceTrackManagement;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ConfrenceTrackTesting
{
    [TestClass]
    public class InputValidations
    {
        [TestMethod]
        public void ReadFileTest()
        {
            var files = Directory.EnumerateFiles("input", "*.txt", SearchOption.TopDirectoryOnly);
            Confrence confrence = null;
            foreach (var file in files)
            {
                confrence = new Confrence(file, DateTime.Now);
                string content = string.Empty;
                using (StreamReader sr = new StreamReader(file))
                {
                    content = sr.ReadToEnd();
                }

                string[] lines = content.Split('\n');
                Assert.AreEqual(lines.Length, confrence.Talks.Count);
            }
        }

        [TestMethod]
        public void TestConfrenceSchedule()
        {
            var files = Directory.EnumerateFiles("input", "*.txt", SearchOption.TopDirectoryOnly);
            Confrence confrence = null;
            foreach (var file in files)
            {
                confrence = new Confrence(file, DateTime.Now);
                int index = 0;
                for (int i = 0; i < confrence.TotalTracks; i++)
                {
                    index = confrence.ScheduleTalks(index, i);
                }
                ValidateTalk(confrence.ScheduledTalks);
            }
        }

        public void ValidateTalk(List<Talk> sessions)
        {
            var session_prev = sessions.FirstOrDefault();
            Assert.AreNotEqual(null, session_prev);
            for (int i = 1; i < sessions.Count; i++)
            {
                var _session = sessions.ElementAt(i);
                /*
                if (_session.Track != session_prev.Track)
                {
                    session_prev = _session;
                    continue;
                }
                */
                if (_session != null)
                {
                    double diff = _session.ScheduledDate.Subtract(session_prev.ScheduledDate).TotalMinutes;
                    Assert.AreEqual(true, diff >= session_prev.Time);
                    session_prev = _session;
                }
            }
        }
    }
}