using ApiForFirstAngular.Controllers.Base;
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
        [HttpPost]
        public async Task<IActionResult> AddCoachToClub([FromBody]CoachCreate command)
        {
            var result = await _coachService.AddCoachToClub(command);
            return Ok(result);
        }

    }
}
