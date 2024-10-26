using Infrastructure.DTOs.Players;

namespace Infrastructure.Interfaces
{
    public interface IPlayerService
    {
        Task<PlayerDetailsDTO> GetPlayerDetailsByIdAsync(Guid playerId);
    }
}
