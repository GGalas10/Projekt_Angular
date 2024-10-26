using Infrastructure.Commands.SportClub;
using Infrastructure.DTOs.Club;

namespace Infrastructure.Interfaces
{
    public interface ISportClubService
    {
        Task<Guid> CreateClub(CreateClub command,Guid userId);
        Task UpdateClub(UpdateClub command, Guid clubId);
        Task DeleteClub(Guid clubId);
        Task<ClubDetailsDTO> GetClubById(Guid clubId);
        Task<ClubDetailsDTO> GetClubByName(string clubName);
        Task<List<ClubDetailsDTO>> GetAllUserClubs(Guid userId);
        Task<List<ClubHomeDTO>> GetClubForHomeList();
    }
}
