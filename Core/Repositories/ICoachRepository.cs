using Core.Models;

namespace Core.Repositories
{
    public interface ICoachRepository
    {
        Task<List<Coach>> GetAllClubCoaches(Guid clubId);
    }
}
