using System;
using System.Timers;
using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Hubs;

namespace SignalRDemo
{
    public class ScoreTicker
    {
        private readonly IHubContext<Score> _hubContext;

        private int lastScore = 0;

        private Timer _timer;

        public ScoreTicker(IHubContext<Score> hubContext)
        {
            _hubContext = hubContext;
            
            _timer = new Timer(2000);
            _timer.Elapsed += TimerOnElapsed;
        }

        private void TimerOnElapsed(object sender, ElapsedEventArgs elapsedEventArgs)
        {
            _hubContext.Clients.All.SendAsync("updateScore", GetNextScore());
        }

        private int GetNextScore()
        {
            int newScore = new Random().Next(lastScore, lastScore + 10);
            lastScore = newScore;
            return newScore;
        }

        public void Start()
        {
            _timer.Start();
        }

        public void Stop()
        {
            _timer.Stop();
        }
    }
}