using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.SportClub;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class ClubController : _BaseController
	{
        private readonly ISportClubService _sportClubService;
        public ClubController(ISportClubService sportClubService)
        {
            _sportClubService = sportClubService;
        }
        [HttpGet]
        public async Task<IActionResult> GetClubById(Guid clubId)
        {
            var result = await _sportClubService.GetClubById(clubId);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetClubByName(string clubName)
        {
            var result = await _sportClubService.GetClubByName(clubName);
            return Ok(result);
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> CreateClub([FromBody]CreateClub command)
        {
            var result = await _sportClubService.CreateClub(command, UserId);
            return Created();
        }
        [BindUserId]
        [HttpGet]
        public async Task<IActionResult> GetAllUserClub()
        {
            var result = await _sportClubService.GetAllUserClubs(UserId);
            return Ok(result);
        }
        
        [HttpGet]
        [BindUserId]
        public async Task<IActionResult> GetAllClubs()
        {
            var result = await _sportClubService.GetClubForHomeList();
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetClubIdByName(string clubName)
        {
            var result = await _sportClubService.GetClubIdByNameAsync(clubName);
            return Ok(result);
        }
    }
}
