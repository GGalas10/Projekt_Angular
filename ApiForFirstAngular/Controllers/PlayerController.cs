using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.SportClub.Player;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class PlayerController : _BaseController
    {
        private readonly IPlayerService _playerService;
        public PlayerController(IPlayerService playerService) 
        {
            _playerService = playerService;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetPlayerDetails(Guid playerId)
        {
            var result = await _playerService.GetPlayerDetailsByIdAsync(playerId);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClubPlayers(Guid clubId)
        {
            var result = await _playerService.GetAllPlayersFromClub(clubId);
            return Ok(result);
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> AddPlayerToClub([FromBody]AddPlayerCommand command)
        {
            var result = await _playerService.AddPlayerToClub(command);
            return Ok(result);
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> EditPlayer([FromBody]EditPlayerCommand command)
        {
            await _playerService.EditPlayer(command);
            return Ok();
        }
    }
}
