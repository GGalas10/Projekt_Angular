using ApiForFirstAngular.Controllers.Base;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class LeagueController : _BaseController
    {
        private readonly ILeagueService _leagueService;
        public LeagueController(ILeagueService leagueService)
        {
            _leagueService = leagueService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLeagues()
        {
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetLeagueById(Guid leagueId)
        {
            var result = await _leagueService.GetLeagueById(leagueId);
            return Ok(result);
        }
    }
}
