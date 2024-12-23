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
        public async Task EditCoach(Coach model)
        {
            var oldCoach = await _context.Coaches.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (oldCoach == null)
                throw new BadRequestException("Cannot_Find_Coach_To_Exist");
            oldCoach.Update(model);
            _context.Update(oldCoach);
            _context.Entry(oldCoach).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCoach(Guid coachId)
        {
            var oldCoach = await _context.Coaches.FirstOrDefaultAsync(x => x.Id == coachId);
            if (oldCoach == null)
                throw new BadRequestException("Cannot_Find_Coach_To_Exist");
            _context.Entry(oldCoach).State = EntityState.Deleted;
            _context.Coaches.Remove(oldCoach);
            await _context.SaveChangesAsync();
        }
    }
}
