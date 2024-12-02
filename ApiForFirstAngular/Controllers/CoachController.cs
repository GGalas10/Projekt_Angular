using ApiForFirstAngular.Controllers.Base;
using Infrastructure.Implementations;
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

    }
}
