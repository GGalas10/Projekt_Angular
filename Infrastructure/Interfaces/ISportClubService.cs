using Infrastructure.Commands.SportClub;
using Infrastructure.DTOs.Club;

namespace Infrastructure.Interfaces
{
    public interface ISportClubService
    {
        Task<Guid> CreateClub(CreateClub command,Guid userId);
        Task DeleteClub(Guid clubId);
        Task<ClubDetailsDTO> GetClubById(Guid clubId);
        Task<ClubDetailsDTO> GetClubByName(string clubName);
        Task<List<ClubHomeDTO>> GetAllUserClubs(Guid userId);
        Task<List<ClubHomeDTO>> GetClubForHomeList();
        Task<List<ClubHomeDTO>> GetAllClubs();
        Task<Guid> GetClubIdByNameAsync(string clubName);
        Task<ClubListDTO> GetAllClubsWithPagination(int howMuchClubs, int page);
    }
}
