﻿using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.Coach;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class CoachController : _BaseController
    {
        private readonly ICoachService _coachService;
        public CoachController(ICoachService coachService)
        {
            _coachService = coachService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClubCoaches(Guid clubId)
        {
            var result = await _coachService.GetAllClubCoaches(clubId);
            return Ok(result);
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> AddCoachToClub([FromBody] CoachCreate command)
        {
            var result = await _coachService.AddCoachToClub(command);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetCoachById(Guid coachId)
        {
            var result = await _coachService.GetCoachById(coachId);
            return Ok(result);
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> EditCoach(CoachEdit command)
        {
            await _coachService.EditCoach(command);
            return Ok();
        }
        [BindUserId]
        [HttpDelete]
        public async Task<IActionResult> DeleteCoach(Guid coachId)
        {
            await _coachService.DeleteCoach(coachId);
            return Ok();
        }

    }
}
