using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using Infrastructure.DTOs.Matches;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class MatchService : IMatchService
    {
        private readonly ILeagueRepository _leagueRepository;
        private readonly IMatchRepository _matchRepository;

        public MatchService(ILeagueRepository leagueRepository, IMatchRepository matchRepository)
        {
            _leagueRepository = leagueRepository;
            _matchRepository = matchRepository;
        }

        public async Task GenerateAllMatchesForLeague(Guid leagueId)
        {
            var league = await _leagueRepository.GetLeagueWithClubsById(leagueId);
            var allClubs = league.clubs.Select(x=>x.SportsClubId).ToList();
            List<Match> matches = new List<Match>();
            var WeekendsWithMatchesDays = GetAllWeekendsWithMatchesTime(league.SezonStartDate, allClubs.Count);
            var MatchesPossibles = GetAllPossiblesMatches(allClubs);
            foreach (var weekend in WeekendsWithMatchesDays)
            {
                var tempClubs = allClubs;
                var tempWeekend = weekend;
                while (tempClubs.Count > 0)
                {
                    var firstClub = tempClubs[new Random().Next(0, tempClubs.Count() - 1)];
                    tempClubs.Remove(firstClub);
                    var secondClub = tempClubs[new Random().Next(0, tempClubs.Count()-1)];
                    tempClubs.Remove(secondClub);
                    var oneMatchTime = tempWeekend.matchesTimes[new Random().Next(0,weekend.matchesTimes.Count() - 1)];
                    tempWeekend.matchesTimes.Remove(oneMatchTime);
                    matches.Add(new Match(firstClub, secondClub, oneMatchTime,leagueId));
                }
            }
            await _matchRepository.AddListOfMatches(matches);
        }
        public async Task<MatchDTO> GetMatchById(Guid matchId)
        {
            if (matchId == Guid.Empty)
                throw new BadRequestException("MatchId_Cannot_Be_Empty");
            var match = await _matchRepository.GetMatchById(matchId);
            return MatchDTO.GetFromModel(match);
        }
        public async Task<List<MatchDTOForWeekList>> GetNextWeekMatches()
        {
            var result = await _matchRepository.GetNextWeekMatches();
            return result.Select(x=>MatchDTOForWeekList.GetDTOFromModel(x)).ToList();
        }
        private List<Weekend> GetAllWeekendsWithMatchesTime(DateTime leagueStart,int clubsQuantity)
        {
            var resultList = new List<Weekend>();
            var tempDate = new DateTime();
            if (leagueStart.DayOfWeek == DayOfWeek.Saturday)
                tempDate = leagueStart;
            else
                tempDate = leagueStart.AddDays(6 - (int)leagueStart.DayOfWeek);
            for (int i = 1; i <= clubsQuantity; i++)
            {
                resultList.Add(AddWeekends(DateOnly.FromDateTime(tempDate), clubsQuantity / 2));
                tempDate = tempDate.AddDays(7);
            }
            return resultList;
        }
        private Weekend AddWeekends(DateOnly weekendStart, int howMuchMatchPerWeekend)
        {
            var newWeekend = new Weekend();
            var firstDayMatches = Math.Ceiling((double)howMuchMatchPerWeekend / 2);
            var secondDayMatches = Math.Floor((double)howMuchMatchPerWeekend / 2);
            for (int i = 1; i <= firstDayMatches; i++)
            {
                if (i <= Math.Ceiling(firstDayMatches / 2))
                    newWeekend.matchesTimes.Add(new DateTime(weekendStart, new TimeOnly(18, 0, 0)));
                else
                    newWeekend.matchesTimes.Add(new DateTime(weekendStart, new TimeOnly(20, 0, 0)));
            }

            for (int i = 1; i <= secondDayMatches; i++)
            {
                if (i <= Math.Ceiling(secondDayMatches / 2))
                    newWeekend.matchesTimes.Add(new DateTime(weekendStart.AddDays(1), new TimeOnly(18, 0, 0)));
                else
                    newWeekend.matchesTimes.Add(new DateTime(weekendStart.AddDays(1), new TimeOnly(20, 0, 0)));
            }
            return newWeekend;
        }
        private List<MatchesWithoutDate> GetAllPossiblesMatches(List<Guid> possiblesClubs)
        {
            List<MatchesWithoutDate> result = new List<MatchesWithoutDate>();
            foreach(var clubs in possiblesClubs)
            {
                foreach(var otherClubs in possiblesClubs.Where(x=>x != clubs))
                {
                    result.Add(new MatchesWithoutDate() { home = clubs, away = otherClubs });
                }
            }
            return result;
        }

    }
    public class Weekend
    {
        public List<DateTime> matchesTimes; 
    }
    public class MatchesWithoutDate
    {
        public Guid home { get; set; }
        public Guid away { get; set; }
    }
}
