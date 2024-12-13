using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class StaffRepository : IStaffRepository
    {
        private readonly DataDbContext _context;
        public StaffRepository(DataDbContext context)
        {
            _context = context;
        }
        public async Task<Guid> AddStaffToClub(Staff model, Guid clubId)
        {
            var club = await _context.SportsClubs.FirstOrDefaultAsync(x=>x.Id == clubId);
            if (club == null)
                throw new BadRequestException("Cannot_Find_Club_To_Add_Staff");
            model.StaffClub = club;
            _context.Staffs.Add(model);
            await _context.SaveChangesAsync();
            return model.Id;
        }
    }
}
