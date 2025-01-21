using Core.Exceptions;
using Core.Repositories;
using Infrastructure.Commands.Leagues;
using Infrastructure.DTOs.Leagues;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class LeagueService : ILeagueService
    {
        private readonly ILeagueRepository _leagueRepository;
        private readonly IUserLeagueAccessRepository _userLeagueRepository;
        private readonly IClubRepository _clubRepository;
        public LeagueService(ILeagueRepository leagueRepository,IUserLeagueAccessRepository userLeagueRepository,IClubRepository clubRepository)
        {
            _leagueRepository = leagueRepository;
            _userLeagueRepository = userLeagueRepository;
            _clubRepository = clubRepository;
        }

        public async Task<Guid> CreateLeague(LeagueCreate command,Guid userId)
        {
            if (command == null)
                throw new BadRequestException("Command_Cannot_Be_Null");
            if (command.endDate <= command.startDate)
                throw new BadRequestException("EndDate_Must_Be_Greater_Than_StartDate");
            if (command.startDate <= new DateTime(1888, 1, 1))
                throw new BadRequestException("Cannot_Start_Before_1888");
            var result = await _leagueRepository.CreateLeague(command.CreateModel());
            await _userLeagueRepository.AddLeagueAccessToUserAsync(userId, result);
            return result;
        }
        public async Task<LeagueDTO> GetLeagueById(Guid leagueId)
        {
            if (leagueId == Guid.Empty)
                throw new BadRequestException("LeagueId_Cannot_Be_Empty");
            var result = await _leagueRepository.GetLeagueById(leagueId);
            return LeagueDTO.GetFromModel(result);
        }
        public async Task<List<LeagueHomeDTO>> GetAllLeague()
        {
            var result = await _leagueRepository.GetAllLeagues();
            return result.Select(x=> LeagueHomeDTO.GetFromModel(x)).ToList();
        }

        public async Task<List<LeagueHomeDTO>> GetAllUserLeagues(Guid userId)
        {
            var result = await _userLeagueRepository.GetAllUserLeagues(userId);
            return result.Select(x=>LeagueHomeDTO.GetFromModel(x)).ToList();
        }
        public async Task EditLeaguePrimaryDate(LeagueEdit command)
        {
            if (command.endDate <= command.startDate)
                throw new BadRequestException("EndDate_Must_Be_Greater_Than_StartDate");
            if (command.startDate <= new DateTime(1888, 1, 1))
                throw new BadRequestException("Cannot_Start_Before_1888");
            await _leagueRepository.EditLeaguePrimaryDate(command.GetFromModelCommand());
            await Task.CompletedTask;
        }
        public async Task<LeagueHomeDTO> GetLeagueForEditById(Guid leagueId)
        {
            if (leagueId == Guid.Empty)
                throw new BadRequestException("LeagueId_Cannot_Be_Empty");
            var result = await _leagueRepository.GetLeagueById(leagueId);
            return LeagueHomeDTO.GetFromModel(result);
        }
        public async Task<ClubCountWithMaxDTO> GetClubsCountForLeague(Guid leagueId)
        {
            if (leagueId == Guid.Empty)
                throw new BadRequestException("LeagueId_Cannot_Be_Empty");
            var result = await _leagueRepository.GetLeagueWithClubsById(leagueId);
            return new ClubCountWithMaxDTO() { ClubsCount = result.clubs.Count(), MaxClubs = result.MaxClubsInLeague };
        }
        public async Task AddClubsToLeague(List<Guid> clubsId,Guid leagueId)
        {
            if (clubsId == null || clubsId.Count() <= 0)
                throw new BadRequestException("Cannot_Add_Empty_List");
            var allClubs = await _clubRepository.GetClubsListFromIdList(clubsId);
            await _leagueRepository.AddClubListToLeague(allClubs, leagueId);
        }
    }
}
