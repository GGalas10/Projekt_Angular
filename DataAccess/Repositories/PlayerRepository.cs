using Core.Exceptions;
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
        public async Task AddPlayerToClub(Player player)
        {
            if (player == null)
                throw new InternalServerException("Cannot_Add_Null_Player");
            
            var club = await _dbContext.SportsClubs.FirstOrDefaultAsync(x=>x.Id == player.PlayerClubId);
            if (club == null)
                throw new BadRequestException("The_Club_Doesnt_Exist");

            player.PlayerClub = club;
            _dbContext.Add(player);
            await _dbContext.SaveChangesAsync();
        }
    }
}
