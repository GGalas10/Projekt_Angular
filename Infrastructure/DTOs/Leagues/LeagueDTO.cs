using Core.Enums;
using Core.Models;
using Infrastructure.DTOs.ClubStatistics;
using Infrastructure.DTOs.Matches;

namespace Infrastructure.DTOs.Leagues
{
    public class LeagueDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public DateTime startAt { get; set; }
        public DateTime endAt { get; set; }
        public LeagueStatus status { get; set; }
        public List<ClubStatisticDTO> clubStatistics { get; set; }
        public List<MatchDTO> matches { get; set; }
        public static LeagueDTO GetFromModel(League model)
        {
            return new LeagueDTO()
            {
                id = model.Id,
                name = model.Name,
                startAt = model.SezonStartDate,
                endAt = model.SezonEndDate,
                status = model.Status,
                clubStatistics = model.clubs.Select(x => ClubStatisticDTO.GetFromModel(x)).ToList(),
                matches = model.matches.Select(x => MatchDTO.GetFromModel(x)).ToList()
            };
        }
    }
}
