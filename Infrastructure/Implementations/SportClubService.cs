using Core.Models;
using Core.Repositories;
using Infrastructure.Commands.SportClub;
using Infrastructure.DTOs.Club;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public sealed class SportClubService : ISportClubService
    {
        private readonly IClubRepository _clubRepository;
        private readonly IUserClubAceessRepository _userClubAceessRepository;
        public SportClubService(IClubRepository clubRepository,IUserClubAceessRepository userClubAceessRepository)
        {
            _clubRepository = clubRepository;
            _userClubAceessRepository = userClubAceessRepository;

        }
        public async Task<Guid> CreateClub(CreateClub command,Guid userId)
        {
            if (command == null)
                throw new Exception("Command_Cannot_Be_Null_CreateClub");
            var result = await _clubRepository.CreateClubAsync(new SportsClub(command.name, command.description,command.rising));
            await _userClubAceessRepository.AddClubAccessToUserAsync(userId,result);
            return result;
        }
        public async Task DeleteClub(Guid clubId)
        {
            if (clubId == Guid.Empty)
                throw new Exception("ClubId_Cannot_Be_Empty_DeleteClub");
            await _clubRepository.DeleteClubAsync(clubId);
        }

        public async Task<ClubDetailsDTO> GetClubById(Guid clubId)
        {
            if (clubId == Guid.Empty)
                throw new Exception("ClubId_Cannot_Be_Empty_GetClubById");
            var result = await _clubRepository.GetClubByIdAsync(clubId);
            if (result == null)
                throw new Exception("Cannot_Find_Club_GetClubById");
            return new ClubDetailsDTO(result);
        }
		public async Task<ClubDetailsDTO> GetClubByName(string clubName)
        {
            if (string.IsNullOrEmpty(clubName))
                throw new Exception("ClubName_Cannot_Be_Null_GetClubByName");
            var result = await _clubRepository.GetClubByNameAsync(clubName);
            if (result == null)
                throw new Exception("Cannot_Find_Club_By_Name_GetClubByName");
            return new ClubDetailsDTO(result);
        }
		public async Task<List<ClubHomeDTO>> GetAllUserClubs(Guid userId)
        {
            if (userId == Guid.Empty)
                throw new Exception("UserId_Cannot_Be_Null");
            var result = await _userClubAceessRepository.GetAllUserIdAccessAsync(userId);
            List<SportsClub> newList = new();
            foreach(var item in result)
            {
                newList.Add(await _clubRepository.GetClubByIdAsync(item));
            }
            return newList.Select(x => ClubHomeDTO.GetDTOFromModel(x)).ToList();
        }

        public async Task<List<ClubHomeDTO>> GetClubForHomeList()
        {
            var result = await _clubRepository.GetAllClubsWithoutRelationDataAsyncTake3();
            if(result.Count >= 0)
                return result.Select(x => ClubHomeDTO.GetDTOFromModel(x)).ToList();
            return new List<ClubHomeDTO>();
        }
        public async Task<List<ClubHomeDTO>> GetAllClubs()
        {
            var result = await _clubRepository.GetAllClubsWithoutRelationDataAsync();
            if(result.Count >= 0)
                return result.Select(x => ClubHomeDTO.GetDTOFromModel(x)).ToList();
            return new List<ClubHomeDTO>();
        }
        public async Task<Guid> GetClubIdByNameAsync(string clubName)
        {
            if (string.IsNullOrEmpty(clubName))
                throw new Exception("ClubName_Cannot_Be_Empty_GetClubIdByName");
            var result = await _clubRepository.GetClubByNameAsync(clubName);
            return result.Id;
        }
        public async Task<ClubListDTO> GetAllClubsWithPagination(int howMuchClubs, int page)
        {
            var result = await _clubRepository.GetAllClubs();
            if (result.Count <= 0)
                return new ClubListDTO() { IsAllLoading = true, ClubList = new List<ClubHomeDTO>()};
            var pagination = result.Skip(page*howMuchClubs).Take(howMuchClubs).ToList();
            return new ClubListDTO()
            {
                IsAllLoading = result.Count <= page*howMuchClubs,
                ClubList = pagination.Select(x=> ClubHomeDTO.GetDTOFromModel(x)).ToList(),
            };
        }
        public async Task<List<ClubForSelectListDTO>> GetClubsForSelectList()
        {
            var result = await _clubRepository.GetAllClubs();
            return result.Select(x=>ClubForSelectListDTO.GetFromModel(x)).ToList();
        }
    }
}
