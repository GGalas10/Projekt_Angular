using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

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
        public async Task<List<Player>> GetAllPlayersFromClubAsync(Guid clubId)
        {
            var club = await _dbContext.SportsClubs.Include(x=>x.PlayerList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (club == null)
                throw new BadRequestException("The_Club_Doesnt_Exist");
            return club.PlayerList.ToList();
        }
        public async Task<Guid> AddPlayerToClub(Player player)
        {
            if (player == null)
                throw new InternalServerException("Cannot_Add_Null_Player");
            
            var club = await _dbContext.SportsClubs.FirstOrDefaultAsync(x=>x.Id == player.PlayerClubId);
            if (club == null)
                throw new BadRequestException("The_Club_Doesnt_Exist");

            player.PlayerClub = club;
            _dbContext.Add(player);
            await _dbContext.SaveChangesAsync();
            return player.Id;
        }

        public async Task EditPlayer(Player player)
        {
            if (player == null)
                throw new InternalServerException("Cannot_Edit_Null_Player");

            var oldPlayer = await _dbContext.Players.FirstOrDefaultAsync(x => x.Id == player.Id);
            if (oldPlayer == null)
                throw new BadRequestException("Player_Doesnt_Exist");

            oldPlayer.updateByModel(player);
            _dbContext.Update(oldPlayer);
            _dbContext.Entry(oldPlayer).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }
    }
}
