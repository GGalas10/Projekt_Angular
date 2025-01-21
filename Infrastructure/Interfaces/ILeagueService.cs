using Infrastructure.Commands.Leagues;
using Infrastructure.DTOs.Leagues;

namespace Infrastructure.Interfaces
{
    public interface ILeagueService
    {
        Task<Guid> CreateLeague(LeagueCreate command, Guid userId);
        Task<LeagueDTO> GetLeagueById(Guid leagueId);
        Task<List<LeagueHomeDTO>> GetAllLeague();
        Task<List<LeagueHomeDTO>> GetAllUserLeagues(Guid userId);
        Task EditLeaguePrimaryDate(LeagueEdit command);
        Task<LeagueHomeDTO> GetLeagueForEditById(Guid leagueId);
        Task<ClubCountWithMaxDTO> GetClubsCountForLeague(Guid leagueId);
        Task AddClubsToLeague(List<Guid> clubsId, Guid leagueId);
    }
}
