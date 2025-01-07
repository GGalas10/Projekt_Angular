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
        public LeagueService(ILeagueRepository leagueRepository)
        {
            _leagueRepository = leagueRepository;
        }

        public async Task<Guid> CreateLeague(LeagueCreate command)
        {
            if (command == null)
                throw new BadRequestException("Command_Cannot_Be_Null");
            var result = await _leagueRepository.CreateLeague(command.CreateModel());
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
    }
}
