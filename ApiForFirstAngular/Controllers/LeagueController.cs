using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.Leagues;
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
            var result = await _leagueService.GetAllLeague();
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetLeagueById(Guid leagueId)
        {
            var result = await _leagueService.GetLeagueById(leagueId);
            return Ok(result);
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> CreateLeague(LeagueCreate command)
        {
            var result = await _leagueService.CreateLeague(command,UserId);
            return Ok(result);
        }
    }
}
