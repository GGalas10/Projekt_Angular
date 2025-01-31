using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private readonly DataDbContext _dbContext;
        public MatchRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Match>> GetAllMatches()
            => await _dbContext.Matches.AsNoTracking().ToListAsync();

        public async Task<List<Match>> GetAllMatchesFromLeague(Guid leagueId)
        {
            var result = await _dbContext.Leagues.AsNoTracking().Include(x => x.matches).FirstOrDefaultAsync(x => x.Id == leagueId);
            return result.matches.ToList();
        }
        public async Task AddMatchToLeague(Match match)
        {
            if (match == null)
                throw new BadRequestException("Match_Cannot_Be_Null");
            _dbContext.Matches.Add(match);
            await _dbContext.SaveChangesAsync();
        }
        public async Task AddListOfMatches(List<Match> matches)
        {
            if(!matches.Any())
                throw new BadRequestException("Match_Cannot_Be_Null");
            _dbContext.Matches.AddRange(matches);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<Match> GetMatchById(Guid matchId)
            => await _dbContext.Matches.AsNoTracking().AsSplitQuery().Include(x=>x.HomeClubId).Include(x=>x.AwayClub).FirstOrDefaultAsync(x => x.Id == matchId);
        public async Task<List<Match>> GetNextWeekMatches()
        {          
            var nextWeekStartAt = new DateTime(DateOnly.FromDateTime(DateTime.Now.AddDays(6 - (int)DateTime.Now.DayOfWeek)),new TimeOnly(0,0,0));
            var nextWeekEndAt = new DateTime(DateOnly.FromDateTime(DateTime.Now.AddDays(7 - (int)DateTime.Now.DayOfWeek)), new TimeOnly(23, 59, 59));
            var result = await _dbContext.Matches.AsNoTracking().Where(x=>x.StartAt >= nextWeekStartAt && x.StartAt <= nextWeekEndAt).ToListAsync();
            return result;
        }
            
    }
}
