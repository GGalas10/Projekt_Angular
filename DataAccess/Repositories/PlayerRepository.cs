using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public sealed class PlayerRepository : IPlayerRepository
    {
        private DataDbContext _dbContext;
        public PlayerRepository(DataDbContext dbContext) 
        {
            _dbContext = dbContext; 
        }
        public async Task<Player> GetPlayerByIdAsync(Guid playerId)
        {
            if (playerId == Guid.Empty)
                throw new Exception("PlayerId_Cannot_Be_Empty");
            var result = await _dbContext.Players.FirstOrDefaultAsync(x=>x.Id == playerId);
            return result;
        }
    }
}
