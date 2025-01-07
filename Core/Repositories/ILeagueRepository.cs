using Core.Models;

namespace Core.Repositories
{
    public interface ILeagueRepository
    {
        Task<Guid> CreateLeague(League league);
        Task UpdateLeague(League league,Guid leagueId);
        Task DeleteLeague(Guid leagueId);
        Task<League> GetLeagueById(Guid leagueId);
        Task AddClubeToLeague(SportsClub club, Guid leagueId);
        Task<List<League>> GetAllLeagues();

    }
}
