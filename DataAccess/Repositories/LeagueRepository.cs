using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using DataAccess.Migrations.DataDb;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public sealed class LeagueRepository : ILeagueRepository
    {
        private readonly DataDbContext _dbContext;
        public LeagueRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> CreateLeague(League league)
        {
            if (_dbContext.Leagues.Any(x => x.Name == league.Name && x.SezonStartDate == league.SezonStartDate))
                throw new BadRequestException("League_Is_Already_Exist");
            if (league == null)
                throw new BadRequestException("League_Cannot_Be_Null");
            _dbContext.Add(league);
            await _dbContext.SaveChangesAsync();
            return league.Id;
        }

        public async Task UpdateLeague(League league, Guid leagueId)
        {
            var leagueToUpdate = await _dbContext.Leagues.FirstOrDefaultAsync(x=>x.Id == leagueId);
            if (leagueToUpdate == null)
                throw new BadRequestException("Cannot_Find_League_To_Edit");
            
            _dbContext.Update(leagueToUpdate);
            _dbContext.Entry(leagueToUpdate).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteLeague(Guid leagueId)
        {
            var league = await _dbContext.Leagues.FirstOrDefaultAsync(x => x.Id == leagueId);
            if (league == null)
                throw new BadRequestException("Cannot_Find_League_By_Id");
            _dbContext.Leagues.Remove(league);
            _dbContext.Entry(league).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<League> GetLeagueById(Guid leagueId)
        => await _dbContext.Leagues.AsNoTracking().Include(x=>x.clubs).ThenInclude(x=>x.SportsClub).Include(x=>x.matches).FirstOrDefaultAsync(x => x.Id == leagueId);
        public async Task AddClubToLeague(SportsClub club,Guid leagueId)
        {
            var league = await _dbContext.Leagues.FirstOrDefaultAsync(x => x.Id == leagueId);
            if (league == null)
                throw new BadRequestException("Cannot_Find_League_By_Id");
            var clubForAdd = await _dbContext.SportsClubs.FirstOrDefaultAsync(x=>x.Id == club.Id);
            if (clubForAdd == null)
                throw new Exception("Club_Cannot_Exist");
            league.AddClubToLeague(clubForAdd);
            _dbContext.Update(league);
            _dbContext.Entry(league).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<League>> GetAllLeagues()
            => await _dbContext.Leagues.AsNoTracking().ToListAsync();
        public async Task EditLeaguePrimaryDate(League newLeague)
        {
            var oldLeague = await _dbContext.Leagues.FirstOrDefaultAsync(x=>x.Id==newLeague.Id);
            if (oldLeague == null)
                throw new BadRequestException("Cannot_Find_The_League_For_Edit");
            oldLeague.UpdatedAt = DateTime.Now;
            oldLeague.EditLeaguePrimaryDate(newLeague);
            _dbContext.Update(oldLeague);
            _dbContext.Entry(oldLeague).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }
        public async Task<League> GetLeagueWithClubsById(Guid leagueId)
        {
            var league = await _dbContext.Leagues.AsNoTracking().Include(x=>x.clubs).FirstOrDefaultAsync(x=>x.Id == leagueId);
            if(league == null)
                throw new BadRequestException("Cannot_Find_The_League_For_ClubCount");
            return league;
        }
        public async Task<List<string>> AddClubListToLeague(List<SportsClub> clubs, Guid leagueId)
        {
            List<string> errors = new();
            var league = await _dbContext.Leagues.FirstOrDefaultAsync(x=>x.Id==leagueId);
            if (league == null)
                throw new BadRequestException("Cannot_Find_The_League");
            var leagueClubs = await _dbContext.ClubStatistic.Where(x => x.LeagueId == leagueId).ToListAsync();
            foreach(var club in clubs)
            {
                if (!leagueClubs.Any(x => x.SportsClubId == club.Id))
                    _dbContext.ClubStatistic.Add(new ClubStatistic(club, league));
                else
                    errors.Add($"Klub {club.Name} już jest dodany do ligi");
            }            
            await _dbContext.SaveChangesAsync();
            return errors;
        }
        public async Task RemoveClubFromLeague(Guid leagueId, Guid clubId)
        {
            var clubStatistic = await _dbContext.ClubStatistic.FirstOrDefaultAsync(x => x.SportsClubId == clubId && x.LeagueId == leagueId);
            if (clubStatistic == null)
                throw new BadRequestException("Cannot_Find_The_ClubStatictic");
            _dbContext.ClubStatistic.Remove(clubStatistic);
            _dbContext.Entry(clubStatistic).State = EntityState.Deleted;
            await _dbContext.SaveChangesAsync();
        }
    }
}
