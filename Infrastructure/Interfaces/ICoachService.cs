using Infrastructure.Commands.Coach;
using Infrastructure.DTOs.Coaches;

namespace Infrastructure.Interfaces
{
    public interface ICoachService
    {
        public Task<List<CoachDTO>> GetAllClubCoaches(Guid clubId);
        public Task<Guid> AddCoachToClub(CoachCreate command);
    }
}
