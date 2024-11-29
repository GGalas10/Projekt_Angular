using Core.Models;

namespace Core.Repositories
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerByIdAsync(Guid playerId);
        Task<Guid> AddPlayerToClub(Player player);
        Task EditPlayer(Player player);
    }
}
