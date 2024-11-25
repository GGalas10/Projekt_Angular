using Core.Exceptions;
using Core.Repositories;
using Infrastructure.Interfaces;


namespace Infrastructure.Implementations
{
    public class ClubEditService : IClubEditService
    {
        private readonly IClubEditRepository _repository;
        public ClubEditService(IClubEditRepository repository)
        {
            _repository = repository;
        }
        public async Task UpdateClubName(string newClubName, Guid clubId)
        {
            if (string.IsNullOrEmpty(newClubName))
                throw new BadRequestException("NewClubName_Cannot_Be_Null_Or_Empty");
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            await _repository.UpdateClubName(newClubName, clubId);
            await Task.CompletedTask;
        }

        public async Task UpdateClubDescription(string newClubDescription, Guid clubId)
        {
            if (string.IsNullOrEmpty(newClubDescription))
                throw new BadRequestException("NewClubDescription_Cannot_Be_Null_Or_Empty");
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            await _repository.UpdateClubDescription(newClubDescription, clubId);
            await Task.CompletedTask;
        }    

        public async Task UpdateClubRising(DateTime newRising, Guid clubId)
        {
            if (newRising >= DateTime.Now)
                throw new BadRequestException("Rising_Cannot_Be_Greater_Than_Today");
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            await _repository.UpdateClubRising(newRising, clubId);
            await Task.CompletedTask;
        }
    }
}
