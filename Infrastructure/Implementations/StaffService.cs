using Core.Exceptions;
using Core.Repositories;
using Infrastructure.Commands.Staff;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class StaffService : IStaffService
    {
        private readonly IStaffRepository _staffRepository;
        public StaffService(IStaffRepository staffRepository)
        {
            _staffRepository = staffRepository;
        }

        public async Task<Guid> AddStaffToClub(AddStaffCommand command)
        {
            if (command == null)
                throw new BadRequestException("Command_Cannot_Be_Null");
            var result = await _staffRepository.AddStaffToClub(new Core.Models.Staff(command.JobPosition, command.ContractFrom.Date, command.ContractTo,command.FirstName,command.LastName),command.ClubId);
            return result;
        }
    }
}
