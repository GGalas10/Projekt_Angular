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

        public async Task<List<Staff>> GetAllStaffFromClub(Guid clubId)
        {
            var club = await _context.SportsClubs.AsNoTracking().Include(x=>x.StaffList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (club == null)
                throw new BadRequestException("Cannot_Find_Club_To_Add_Staff");
            return club.StaffList.ToList();
        }

        public async Task<Staff> GetStaffById(Guid staffId)
        {
            var result = await _context.Staffs.AsNoTracking().FirstOrDefaultAsync(x=>x.Id==staffId);
            if (result == null)
                throw new BadRequestException("Cannot_Find_Staff");
            return result;
        }

        public async Task EditStaff(Staff newModel,Guid staffId)
        {
            var oldStaff = await _context.Staffs.FirstOrDefaultAsync(x=>x.Id == staffId);
            if (oldStaff == null)
                throw new BadRequestException("Cannot_Find_Staff_To_Edit");
            oldStaff.UpdateAt = DateTime.Now;
            oldStaff.UpdateModel(newModel);
            _context.Entry(oldStaff).State = EntityState.Modified;
            _context.Update(oldStaff);
            await _context.SaveChangesAsync();
        }
    }
}
