﻿using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class MatchController : _BaseController
    {
        private readonly IMatchService _matchService;
        public MatchController(IMatchService matchService)
        {
            _matchService = matchService;
        }
        [HttpPost, BindUserId]
        public async Task<IActionResult> GenerateMatches(Guid leagueId)
        {
            await _matchService.GenerateAllMatchesForLeague(leagueId);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetMatchById(Guid matchId)
        {
            var result = await _matchService.GetMatchById(matchId);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetNextWeekMatches()
        {
            var result = await _matchService.GetNextWeekMatches();
            return Ok(result);
        }
    }
}
