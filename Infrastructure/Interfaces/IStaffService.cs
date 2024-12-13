using Infrastructure.Commands.Staff;

namespace Infrastructure.Interfaces
{
    public interface IStaffService
    {
        Task<Guid> AddStaffToClub(AddStaffCommand command);
    }
}
