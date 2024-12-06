using Core.Models;

namespace Core.Repositories
{
    public interface ICoachRepository
    {
        Task<List<Coach>> GetAllClubCoaches(Guid clubId);
        Task<Guid> AddCoachToClub(Coach coach,Guid clubId);
        Task<Coach> GetCoachById(Guid coachId);
        Task EditCoach(Coach model);
    }
}
