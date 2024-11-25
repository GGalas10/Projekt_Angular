using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public sealed class ClubRepository : IClubRepository
    {
        private readonly DataDbContext _context;
        public ClubRepository(DataDbContext context) 
        {
            _context = context; 
        }

        public async Task<Guid> CreateClubAsync(SportsClub model)
        {
            if (model == null)
                throw new BadRequestException("Model_Cannot_Be_Null_CreateClub");
            if (_context.SportsClubs.AsNoTracking().Any(x => x.Name == model.Name))
                throw new BadRequestException("Club_With_This_Name_Is_Already_Exist_CreateClub");
            _context.SportsClubs.Add(model);
            await _context.SaveChangesAsync();
            return model.Id;
        }
        public async Task DeleteClubAsync(Guid clubId)
        {
            var sportClub = await _context.SportsClubs.FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_UpdateClub");
            _context.SportsClubs.Remove(sportClub);
            await _context.SaveChangesAsync();
        }
        public async Task<SportsClub> GetClubByIdAsync(Guid clubId)
        => await _context.SportsClubs.AsNoTracking().AsSplitQuery().Include(x=>x.PlayerList).Include(x=>x.CoachList).Include(x=>x.StaffList).FirstOrDefaultAsync(x => x.Id == clubId);
        public async Task<SportsClub> GetClubByNameAsync(string clubName)
        => await _context.SportsClubs.AsNoTracking().AsSplitQuery().Include(x=>x.PlayerList).Include(x=>x.CoachList).Include(x=>x.StaffList).FirstOrDefaultAsync(x => x.Name == clubName);

        public async Task AddStaffToClubAsync(Guid clubId, Staff staff)
        {
            var sportClub = await _context.SportsClubs.Include(x=>x.StaffList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_AddStaffToClub");
            if (staff == null)
                throw new BadRequestException("Model_Cannot_Be_Null_AddStaffToClub");
            
            _context.Add(staff);
            sportClub.AddStaff(staff);
            _context.Update(sportClub);
            await _context.SaveChangesAsync();
        }
        public async Task AddPlayerToClubAsync(Guid clubId, Player player)
        {
            var sportClub = await _context.SportsClubs.Include(x=>x.PlayerList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_AddPlayerToClub");
            if (player == null)
                throw new BadRequestException("Model_Cannot_Be_Null_AddPlayerToClub");

            _context.Add(player);
            sportClub.AddPlayer(player);
            _context.Update(sportClub);
            await _context.SaveChangesAsync();
        }

        public async Task AddCoachToClubAsync(Guid clubId, Coach coach)
        {
            var sportClub = await _context.SportsClubs.Include(x=>x.CoachList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_AddCoachToClub");
            if (coach == null)
                throw new BadRequestException("Model_Cannot_Be_Null_AddCoachToClub");

            _context.Add(coach);
            sportClub.AddCoach(coach);
            _context.Update(sportClub);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStaffFromClubAsync(Guid clubId, Guid staffId)
        {
            var sportClub = await _context.SportsClubs.Include(x => x.StaffList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_DeleteStaffToClub");
            var staffToDelete = sportClub.StaffList.FirstOrDefault(x=>x.Id == staffId);
            if(staffToDelete == null)
                throw new BadRequestException("Cannot_Find_Staff_To_Delete_DeleteStaffFromClub");
            sportClub.RemoveStaff(staffToDelete);
            _context.Update(sportClub);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePlayerFromClubAsync(Guid clubId, Guid playerId)
        {
            var sportClub = await _context.SportsClubs.Include(x => x.PlayerList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_DeletePlayerToClub");
            var playerToDelete = sportClub.PlayerList.FirstOrDefault(x => x.Id == playerId);
            if (playerToDelete == null)
                throw new BadRequestException("Cannot_Find_Staff_To_Delete_DeletePlayerToClub");
            sportClub.RemovePlayer(playerToDelete); 
            _context.Update(sportClub); 
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCoachFromClubAsync(Guid clubId, Guid coachId)
        {
            var sportClub = await _context.SportsClubs.Include(x => x.CoachList).FirstOrDefaultAsync(x => x.Id == clubId);
            if (sportClub == null)
                throw new BadRequestException("Cannot_Find_Club_With_Id_DeleteCoachToClub");
            var coachToDelete = sportClub.CoachList.FirstOrDefault(x => x.Id == coachId);
            if (coachToDelete == null)
                throw new BadRequestException("Cannot_Find_Staff_To_Delete_DeleteCoachToClub");
            sportClub.RemoveCoach(coachToDelete);
            _context.Update(sportClub);
            await _context.SaveChangesAsync();
        }

        public async Task<List<SportsClub>> GetAllClubsWithoutRelationDataAsync()
        => await _context.SportsClubs.AsNoTracking().OrderBy(x=>x.Id).Take(3).ToListAsync();
        public async Task<List<SportsClub>> GetAllClubsWithoutRelationDataAsyncTake3()
        => await _context.SportsClubs.AsNoTracking().OrderBy(x=>x.Id).ToListAsync();
        public async Task<List<SportsClub>> GetAllClubsWithRelationDataAsync()
        => await _context.SportsClubs.AsNoTracking().AsSplitQuery().Include(x => x.PlayerList).Include(x => x.CoachList).Include(x => x.StaffList).ToListAsync();
    }
}
