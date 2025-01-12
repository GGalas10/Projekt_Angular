using Core.Models;

namespace Core.Repositories
{
    public interface IUserLeagueAccessRepository
    {
        Task AddLeagueAccessToUserAsync(Guid userId, Guid leagueId);
        Task RemoveLeagueAccessFromUserAsync(Guid userId, Guid leagueId);
        Task<List<Guid>> GetAllUserIdAccessAsync(Guid userId);
        Task<List<Guid>> GetAllUsersIdWithAccessToLeagueAsync(Guid leagueId);
        Task<List<League>> GetAllUserLeagues(Guid userId);
    }
}
