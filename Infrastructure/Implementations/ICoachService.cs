using Infrastructure.DTOs.Coaches;

namespace Infrastructure.Implementations
{
    public interface ICoachService
    {
        public Task<List<CoachDTO>> GetAllClubCoaches(Guid clubId);
    }
}
