using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    
    public class TestController : Controller
    {
		[Route("/Test")]
        [HttpGet]
		public IActionResult Index()
        {
            return Json("Testowa odpowiedź");
        }
    }
}
