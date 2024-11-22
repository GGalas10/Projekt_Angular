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
        
        [HttpGet]
        public async Task<IActionResult> GetAllClubs()
        {
            var result = await _sportClubService.GetAllClubs();
            return Ok(result);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllClubsForHome()
        {
            var result = await _sportClubService.GetClubForHomeList();
            return Ok(result);
        }
        
    }
}
