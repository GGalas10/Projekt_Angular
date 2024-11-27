using Core.Exceptions;
using Core.Repositories;
using Infrastructure.DTOs.Club;
using Infrastructure.Interfaces;


namespace Infrastructure.Implementations
{
    public class ClubEditService : IClubEditService
    {
        private readonly IClubEditRepository _repository;
        private readonly IClubRepository _clubRepository;
        public ClubEditService(IClubEditRepository repository, IClubRepository clubRepository)
        {
            _repository = repository;
            _clubRepository = clubRepository;
        }
        public async Task UpdateClubName(Guid userId, string newClubName, Guid clubId)
        {
            if (string.IsNullOrEmpty(newClubName))
                throw new BadRequestException("NewClubName_Cannot_Be_Null_Or_Empty");
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            await _repository.UpdateClubName(newClubName, clubId);
            await Task.CompletedTask;
        }

        public async Task UpdateClubDescription(Guid userId, string newClubDescription, Guid clubId)
        {
            if (string.IsNullOrEmpty(newClubDescription))
                throw new BadRequestException("NewClubDescription_Cannot_Be_Null_Or_Empty");
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            await _repository.UpdateClubDescription(newClubDescription, clubId);
            await Task.CompletedTask;
        }    

        public async Task UpdateClubRising(Guid userId, DateTime newRising, Guid clubId)
        {
            if (newRising >= DateTime.Now)
                throw new BadRequestException("Rising_Cannot_Be_Greater_Than_Today");
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            await _repository.UpdateClubRising(newRising, clubId);
            await Task.CompletedTask;
        }

        public async Task<ClubDetailsDTO> GetClubById(Guid userId, Guid clubId)
        {
            await CheckUserAccessess(userId, clubId);
            var result = await _clubRepository.GetClubByIdAsync(clubId);
            return new ClubDetailsDTO(result);
        }
        private async Task CheckUserAccessess(Guid userId, Guid clubId)
        {
            if (userId == Guid.Empty)
                throw new UnauthorizedAccessException();
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            if (!await _repository.CheckUserHasAccess(userId, clubId))
                throw new ForbiddenException("User_Has_Not_Access_To_The_Club");
        }
    }
}
