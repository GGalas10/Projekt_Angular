using Infrastructure.DTOs.Club;

namespace Infrastructure.Interfaces
{
    public interface IClubEditService
    {
        Task<ClubDetailsDTO> GetClubById(Guid userId, Guid clubId);
        Task UpdateClubName(Guid userId, string newClubName, Guid clubId);
        Task UpdateClubDescription(Guid userId, string newClubDescription, Guid clubId);
        Task UpdateClubRising(Guid userId, DateTime newRising, Guid clubId);
    }
}
