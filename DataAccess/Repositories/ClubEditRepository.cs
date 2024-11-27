using Core.Exceptions;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    internal class ClubEditRepository : IClubEditRepository
    {
        private readonly DataDbContext _context;
        public ClubEditRepository(DataDbContext context)
        {
            _context = context;
        }

        public async Task UpdateClubName(string newClubName, Guid clubId)
        {
            var club = await _context.SportsClubs.FirstOrDefaultAsync(x=>x.Id == clubId);
            if (club == null)
                throw new InternalServerException("Cannot_Find_Club_In_Database");
            club.UpdateName(newClubName);
            _context.Update(club);
            _context.Entry(club).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
        public async Task UpdateClubDescription(string newClubDescription, Guid clubId)
        {
            
            var club = await _context.SportsClubs.FirstOrDefaultAsync(x => x.Id == clubId);
            if (club == null)
                throw new InternalServerException("Cannot_Find_Club_In_Database");
            club.UpdateDescription(newClubDescription);
            _context.Update(club);
            _context.Entry(club).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        } 
        public async Task UpdateClubRising(DateTime newRising, Guid clubId)
        {           
            var club = await _context.SportsClubs.FirstOrDefaultAsync(x => x.Id == clubId);
            if (club == null)
                throw new InternalServerException("Cannot_Find_Club_In_Database");
            club.UpdateRising(newRising);
            _context.Update(club);
            _context.Entry(club).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CheckUserHasAccess(Guid userId, Guid clubId)
        => await _context.UserClubAccesses.AnyAsync(x=>x.UserId == userId && x.SportsClubId == clubId);
    }
}
