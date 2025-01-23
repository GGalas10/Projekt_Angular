using Core.Models;

namespace Core.Repositories
{
    public interface ILeagueRepository
    {
        Task<Guid> CreateLeague(League league);
        Task UpdateLeague(League league,Guid leagueId);
        Task DeleteLeague(Guid leagueId);
        Task<League> GetLeagueById(Guid leagueId);
        Task AddClubToLeague(SportsClub club, Guid leagueId);
        Task<List<League>> GetAllLeagues();
        Task EditLeaguePrimaryDate(League newLeague);
        Task<League> GetLeagueWithClubsById(Guid leagueId);
        Task<List<string>> AddClubListToLeague(List<SportsClub> clubs, Guid leagueId);
        Task RemoveClubFromLeague(Guid leagueId, Guid clubId);
    }
}
