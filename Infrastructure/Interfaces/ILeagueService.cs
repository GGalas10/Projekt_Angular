using Infrastructure.Commands.Leagues;
using Infrastructure.DTOs.Leagues;

namespace Infrastructure.Interfaces
{
    public interface ILeagueService
    {
        Task<Guid> CreateLeague(LeagueCreate command, Guid userId);
        Task<LeagueDTO> GetLeagueById(Guid leagueId);
        Task<List<LeagueHomeDTO>> GetAllLeague();
    }
}
