using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class UserLeagueAccessRepository : IUserLeagueAccessRepository
    {
        private readonly DataDbContext _dataDbContext;
        public UserLeagueAccessRepository(DataDbContext dataDbContext)
        {
            _dataDbContext = dataDbContext;
        }
        public async Task AddLeagueAccessToUserAsync(Guid userId, Guid leagueId)
        {
            if (userId == Guid.Empty)
                throw new Exception("UserId_Cannot_Be_Empty_AddClubAccess");
            if (leagueId == Guid.Empty)
                throw new Exception("ClubId_Cannot_Be_Empty_AddClubAccess");
            var league = _dataDbContext.Leagues.FirstOrDefault(x => x.Id == leagueId);
            if (league == null)
                throw new Exception("Cannot_Find_Club_AddClubAccess");
            var newAccess = new UserLeagueAccess()
            {
                League = league,
                UserId = userId,
            };
            _dataDbContext.UserLeagueAccesses.Add(newAccess);
            await _dataDbContext.SaveChangesAsync();
        }
        public async Task RemoveLeagueAccessFromUserAsync(Guid userId, Guid leagueId)
        {
            if (userId == Guid.Empty)
                throw new Exception("UserId_Cannot_Be_Empty_RemoveClubAccessFromUser");
            if (leagueId == Guid.Empty)
                throw new Exception("ClubId_Cannot_Be_Empty_RemoveClubAccessFromUser");
            var access = _dataDbContext.UserLeagueAccesses.FirstOrDefault(x => x.UserId == userId && x.LeagueId == leagueId);
            if (access == null)
                throw new Exception("Cannot_Find_Access_RemoveClubAccessFromUser");
            _dataDbContext.UserLeagueAccesses.Remove(access);
            await _dataDbContext.SaveChangesAsync();
        }

        public async Task<List<Guid>> GetAllUserIdAccessAsync(Guid userId)
            => await _dataDbContext.UserLeagueAccesses.AsNoTracking().Where(x => x.UserId == userId).Select(x => x.LeagueId).ToListAsync();

        public async Task<List<Guid>> GetAllUsersIdWithAccessToLeagueAsync(Guid leagueId)
            => await _dataDbContext.UserLeagueAccesses.AsNoTracking().Where(x => x.LeagueId == leagueId).Select(x => x.LeagueId).ToListAsync();

        public async Task<List<League>> GetAllUserLeagues(Guid userId)
            => await _dataDbContext.UserLeagueAccesses.AsNoTracking().Include(x => x.League).Where(x=>x.UserId == userId).Select(x=>x.League).ToListAsync();
    }
}
