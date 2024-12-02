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
        public async Task<List<PlayerDetailsDTO>> GetAllPlayersFromClub(Guid clubId)
        {
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            var result = await _playerRepository.GetAllPlayersFromClubAsync(clubId);
            return result.Select(x=> PlayerDetailsDTO.GetFromModel(x)).ToList();
        }
        public async Task<Guid> AddPlayerToClub(AddPlayerCommand command)
        {
            if (command == null)
                throw new BadRequestException("Cannot_Create_Player_With_Null_Command");
            command.IsValid();
            var result = await _playerRepository.AddPlayerToClub(AddPlayerCommand.GetFromCommand(command));
            return result;
        }
        public async Task EditPlayer(EditPlayerCommand command)
        {
            if (command == null)
                throw new BadRequestException("Cannot_Create_Player_With_Null_Command");
            command.IsValid();
            await _playerRepository.EditPlayer(EditPlayerCommand.GetFromCommand(command));
            await Task.CompletedTask;
        }
    }
}
