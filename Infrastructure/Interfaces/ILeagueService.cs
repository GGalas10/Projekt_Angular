using Infrastructure.Commands.Leagues;
using Infrastructure.DTOs.Leagues;

namespace Infrastructure.Interfaces
{
    public interface ILeagueService
    {
        Task<Guid> CreateLeague(LeagueCreate command);
        Task<LeagueDTO> GetLeagueById(Guid leagueId);
    }
}
