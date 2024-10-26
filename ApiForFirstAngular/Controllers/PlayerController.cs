using ApiForFirstAngular.Controllers.Base;
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
    }
}
