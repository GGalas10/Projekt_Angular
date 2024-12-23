using Infrastructure.Commands.Coach;
using Infrastructure.DTOs.Coaches;

namespace Infrastructure.Interfaces
{
    public interface ICoachService
    {
        Task<List<CoachDTO>> GetAllClubCoaches(Guid clubId);
        Task<Guid> AddCoachToClub(CoachCreate command);
        Task<CoachDTO> GetCoachById(Guid coachId);
        Task EditCoach(CoachEdit command);
        Task DeleteCoach(Guid coachId);
    }
}
