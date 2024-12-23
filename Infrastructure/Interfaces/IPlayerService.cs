using Infrastructure.Commands.SportClub.Player;
using Infrastructure.DTOs.Players;

namespace Infrastructure.Interfaces
{
    public interface IPlayerService
    {
        Task<PlayerDetailsDTO> GetPlayerDetailsByIdAsync(Guid playerId);
        Task<List<PlayerDetailsDTO>> GetAllPlayersFromClub(Guid clubId);
        Task<Guid> AddPlayerToClub(AddPlayerCommand command);
        Task EditPlayer(EditPlayerCommand command);
        Task DeletePlayer(Guid playerId);
    }
}
