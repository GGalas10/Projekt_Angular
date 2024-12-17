using Core.Models;

namespace Core.Repositories
{
    public interface IStaffRepository
    {
        Task<Guid> AddStaffToClub(Staff model, Guid clubId);
        Task<List<Staff>> GetAllStaffFromClub(Guid clubId);
        Task<Staff> GetStaffById(Guid staffId);
    }
}
