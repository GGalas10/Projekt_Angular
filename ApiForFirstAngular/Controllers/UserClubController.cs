using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.SportClub;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    [BindUserId]
    public class UserClubController : _BaseController
    {        
        private readonly ISportClubService _sportClubService;
        public UserClubController(ISportClubService sportClubService)
        {
            _sportClubService = sportClubService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateClub([FromBody] CreateClub command)
        {
            var result = await _sportClubService.CreateClub(command, UserId);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUserClub()   
        {
            var result = await _sportClubService.GetAllUserClubs(UserId);
            return Ok(result);
        }
    }
}
