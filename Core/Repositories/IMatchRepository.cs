using Core.Models;

namespace Core.Repositories
{
    public interface IMatchRepository
    {
        Task<List<Match>> GetAllMatches();
        Task<List<Match>> GetAllMatchesFromLeague(Guid leagueId);
        Task AddMatchToLeague(Match match);
        Task<Match> GetMatchById(Guid matchId);
        Task AddListOfMatches(List<Match> matches);
    }
}
