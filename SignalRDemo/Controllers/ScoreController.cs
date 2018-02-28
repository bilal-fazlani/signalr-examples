using Microsoft.AspNetCore.Mvc;

namespace SignalRDemo.Controllers
{
    public class ScoreController : Controller
    {
        private readonly ScoreTicker _scoreTicker;

        public ScoreController(ScoreTicker scoreTicker)
        {
            _scoreTicker = scoreTicker;
        }
        
        // GET
        [Route("/start")]
        public IActionResult Start()
        {
            _scoreTicker.Start();
            
            return Json(new
            {
                Status = "Started"
            });
        }
        
        // GET
        [Route("/stop")]
        public IActionResult Stop()
        {
            _scoreTicker.Stop();
            
            return Json(new
            {
                Status = "Stopped"
            });
        }
    }
}