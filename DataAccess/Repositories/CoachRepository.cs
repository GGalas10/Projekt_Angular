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
            var club = await _context.SportsClubs.AsNoTracking().Include(x => x.CoachList).Where(x => x.Id == clubId).FirstOrDefaultAsync();
            if (club == null)
                throw new BadRequestException("Club_Doesnt_Exist");
            return club.CoachList.ToList();
        }
        public async Task<Guid> AddCoachToClub(Coach coach, Guid clubId)
        {
            var club = await _context.SportsClubs.Include(x => x.CoachList).Where(x => x.Id == clubId).FirstOrDefaultAsync();
            if (club == null)
                throw new BadRequestException("Club_Doesnt_Exist");
            coach.CoachClub = club;
            _context.Add(coach);
            await _context.SaveChangesAsync();
            return coach.Id;
        }
        public async Task<Coach> GetCoachById(Guid coachId)
        {
            var coach = await _context.Coaches.FirstOrDefaultAsync(x => x.Id == coachId);
            if (coach == null)
                throw new BadRequestException("Coach_Doesnt_Exist");
            return coach;
        }
    }
}
