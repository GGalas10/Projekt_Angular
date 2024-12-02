using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public class CoachRepository : ICoachRepository
    {
        private readonly DataDbContext _context;
        public CoachRepository(DataDbContext context)
        {
            _context = context;
        }
        public async Task<List<Coach>> GetAllClubCoaches(Guid clubId)
        {
            var club = await _context.SportsClubs.AsNoTracking().Include(x=>x.CoachList).Where(x=>x.Id == clubId).FirstOrDefaultAsync();
            if (club == null)
                throw new BadRequestException("Club_Doesnt_Exist");
            return club.CoachList.ToList();
        }
    }
}
