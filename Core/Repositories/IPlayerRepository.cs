using Core.Models;

namespace Core.Repositories
{
    public interface IPlayerRepository
    {
        Task<Player> GetPlayerByIdAsync(Guid playerId);
    }
}
