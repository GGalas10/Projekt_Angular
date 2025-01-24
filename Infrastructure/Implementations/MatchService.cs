using Core.Models;
using Core.Repositories;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class MatchService : IMatchService
    {
        private readonly ILeagueRepository _leagueRepository;
        public MatchService(ILeagueRepository leagueRepository)
        {
            _leagueRepository = leagueRepository;
        }

        public async Task GenerateAllMatchesForLeague(Guid leagueId)
        {
            var league = await _leagueRepository.GetLeagueWithClubsById(leagueId);
            var allClubs = league.clubs.Select(x=>x.SportsClubId).ToList();
            List<Match> matches = new List<Match>();
        }
        private Task<List<DateTime>> GetAllMatchesDays(DateTime leagueStart,int clubsQuantity)
        {
            var resultList = new List<DateTime>();
            var tempDate = new DateTime();
            if (leagueStart.DayOfWeek == DayOfWeek.Saturday)
                tempDate = leagueStart;
            else
                tempDate = leagueStart.AddDays(6 - (int)leagueStart.DayOfWeek);
            for (int i = 1; i <= clubsQuantity; i++)
            {

            }
        }
        private Weekend AddWeekends(DateOnly weekendStart, int howMuchMatchPerWeekend)
        {
            var newWeekend = new Weekend();
            for (int i = 0; i < howMuchMatchPerWeekend; i++)
            {
                newWeekend.matchesTimes[i] = new DateTime(weekendStart, new TimeOnly(18, 00, 00));
            }
        }

    }
    public class Weekend
    {
        public List<DateTime> matchesTimes; 
    }
}
