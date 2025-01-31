using Infrastructure.DTOs.Matches;

namespace Infrastructure.Interfaces
{
    public interface IMatchService
    {
        Task GenerateAllMatchesForLeague(Guid leagueId);
        Task<MatchDTO> GetMatchById(Guid matchId);
        Task<List<MatchDTOForWeekList>> GetNextWeekMatches();
    }
}
