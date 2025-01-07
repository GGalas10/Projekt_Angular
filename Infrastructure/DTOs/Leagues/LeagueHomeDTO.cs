using Core.Enums;
using Core.Models;

namespace Infrastructure.DTOs.Leagues
{
    public class LeagueHomeDTO
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public DateTime startAt { get; set; }
        public DateTime endAt { get; set; }
        public LeagueStatus status { get; set; }
        public static LeagueHomeDTO GetFromModel(League model)
        {
            return new LeagueHomeDTO()
            {
                id = model.Id,
                name = model.Name,
                startAt = model.SezonStartDate,
                endAt = model.SezonEndDate,
                status = model.Status,
            };
        }
    }
}
