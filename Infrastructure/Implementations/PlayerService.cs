using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using Infrastructure.Commands.SportClub.Player;
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
        public async Task AddPlayerToClub(AddPlayerCommand command)
        {
            if (command == null)
                throw new BadRequestException("Cannot_Create_Player_With_Null_Command");
            command.IsValid();
            await _playerRepository.AddPlayerToClub(AddPlayerCommand.GetFromCommand(command));
            await Task.CompletedTask;
        }
    }
}
