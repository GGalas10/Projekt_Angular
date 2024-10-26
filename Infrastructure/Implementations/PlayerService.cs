using Core.Repositories;
using Infrastructure.DTOs.Players;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public sealed class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;
        public PlayerService(IPlayerRepository playerRepository) 
        {
            _playerRepository = playerRepository;
        }
        public async Task<PlayerDetailsDTO> GetPlayerDetailsByIdAsync(Guid playerId)
        {
            var result = await _playerRepository.GetPlayerByIdAsync(playerId);
            if (result == null)
                throw new Exception("Cannot_Find_Player_GetPlayerDetails");
            return PlayerDetailsDTO.GetFromModel(result);
        }
    }
}
