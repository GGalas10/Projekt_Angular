using ApiForFirstAngular.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class LeagueController : _BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllLeagues()
        {
            return Ok();
        }
    }
}
