﻿using Infrastructure.Commands.Staff;
using Infrastructure.DTOs.Staffs;

namespace Infrastructure.Interfaces
{
    public interface IStaffService
    {
        Task<Guid> AddStaffToClub(AddStaffCommand command);
        Task<List<StaffDTO>> GetAllStaffFromClub(Guid clubId);
        Task<StaffDTO> GetStaffById(Guid staffId);
        Task EditStaff(EditStaffCommand command);
        Task DeleteStaff(Guid staffId);
    }
}
