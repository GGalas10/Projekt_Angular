using Infrastructure.Commands.SportClub.Player;
using Infrastructure.DTOs.Players;

namespace Infrastructure.Interfaces
{
    public interface IPlayerService
    {
        Task<PlayerDetailsDTO> GetPlayerDetailsByIdAsync(Guid playerId);
        Task<Guid> AddPlayerToClub(AddPlayerCommand command);
        Task EditPlayer(EditPlayerCommand command);
    }
}
