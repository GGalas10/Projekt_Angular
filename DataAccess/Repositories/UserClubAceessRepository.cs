using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public sealed class UserClubAceessRepository : IUserClubAceessRepository
    {
        private readonly DataDbContext _dbContext;
        public UserClubAceessRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddClubAccessToUserAsync(Guid userId, Guid clubId)
        {
            if (userId == Guid.Empty)
                throw new Exception("UserId_Cannot_Be_Empty_AddClubAccess");
            if (clubId == Guid.Empty)
                throw new Exception("ClubId_Cannot_Be_Empty_AddClubAccess");
            var club = _dbContext.SportsClubs.FirstOrDefault(x=>x.Id == clubId);
            if (club == null)
                throw new Exception("Cannot_Find_Club_AddClubAccess");
            var newAccess = new UserClubAccess()
            {
                SportsClub = club,
                UserId = userId,
            };
            _dbContext.UserClubAccesses.Add(newAccess);
            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveClubAccessFromUserAsync(Guid userId, Guid clubId)
        {
            if (userId == Guid.Empty)
                throw new Exception("UserId_Cannot_Be_Empty_RemoveClubAccessFromUser");
            if (clubId == Guid.Empty)
                throw new Exception("ClubId_Cannot_Be_Empty_RemoveClubAccessFromUser");
            var access = _dbContext.UserClubAccesses.FirstOrDefault(x=>x.UserId == userId && x.SportsClubId == clubId);
            if (access == null)
                throw new Exception("Cannot_Find_Access_RemoveClubAccessFromUser");
            _dbContext.UserClubAccesses.Remove(access);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Guid>> GetAllUserIdAccessAsync(Guid userId)
        => await _dbContext.UserClubAccesses.AsNoTracking().Where(x => x.UserId == userId).Select(x => x.SportsClubId).ToListAsync();

        public async Task<List<Guid>> GetAllUsersIdWithAccessToClubAsync(Guid clubId)
        => await _dbContext.UserClubAccesses.AsNoTracking().Where(x => x.SportsClubId == clubId).Select(x => x.SportsClubId).ToListAsync();

    }
}
