using Core.Exceptions;
using Core.Repositories;
using Infrastructure.DTOs.Coaches;
using Infrastructure.Implementations;

namespace Infrastructure.Interfaces
{
    public class CoachService : ICoachService
    {
        private readonly ICoachRepository _coachRepository;
        public CoachService(ICoachRepository coachRepository)
        {
            _coachRepository = coachRepository;
        }
        public async Task<List<CoachDTO>> GetAllClubCoaches(Guid clubId)
        {
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            var result = await _coachRepository.GetAllClubCoaches(clubId);
            return result.Select(x=>CoachDTO.GetFromModel(x)).ToList();
        }
    }
}
