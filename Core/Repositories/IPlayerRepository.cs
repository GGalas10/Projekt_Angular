using Core.Models;

namespace Core.Repositories
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerByIdAsync(Guid playerId);
        Task<List<Player>> GetAllPlayersFromClubAsync(Guid clubId);
        Task<Guid> AddPlayerToClub(Player player);
        Task EditPlayer(Player player);
        Task DeletePlayer(Guid playerId);
    }
}
