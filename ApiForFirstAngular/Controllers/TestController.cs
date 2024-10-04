using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class TestController : Controller
    {
        public IActionResult Index()
        {
            return Json("Testowa odpowiedź");
        }
    }
}
