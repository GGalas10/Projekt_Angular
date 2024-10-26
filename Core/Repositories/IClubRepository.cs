﻿using Core.Models;

namespace Core.Repositories
{
    public interface IClubRepository
    {
        Task<Guid> CreateClubAsync(SportsClub model);
        Task UpdateClubAsync(SportsClub model,Guid clubId);
        Task DeleteClubAsync(Guid clubId);
        Task<SportsClub> GetClubByIdAsync(Guid clubId);
        Task<SportsClub> GetClubByNameAsync(string clubName);
        Task AddStaffToClubAsync(Guid clubId, Staff staff);
        Task AddPlayerToClubAsync(Guid clubId, Player player);
        Task AddCoachToClubAsync(Guid clubId, Coach coach);
        Task DeleteStaffFromClubAsync(Guid clubId,Guid staffId);
        Task DeletePlayerFromClubAsync(Guid clubId,Guid playerId);
        Task DeleteCoachFromClubAsync(Guid clubId,Guid coachId);
        Task<List<SportsClub>> GetAllClubsWithoutRelationDataAsync();
        Task<List<SportsClub>> GetAllClubsWithRelationDataAsync();
    }
}
