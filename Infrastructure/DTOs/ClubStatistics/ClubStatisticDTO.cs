using Core.Models;
using Infrastructure.DTOs.Club;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Infrastructure.DTOs.ClubStatistics
{
    public class ClubStatisticDTO
    {
        public Guid id { get; set; }
        public Guid clubId { get; set; }
        public string clubName { get; set; }
        public int goalsFor { get; set; }
        public int goalsAganist { get; set; }
        public int goalsDifferences { get; set; }
        public int clubAssists { get; set; }
        public int played { get; set; }
        public int won { get; set; }
        public int drawn { get; set; }
        public int lost { get; set; }
        public int points { get; set; }
        public static ClubStatisticDTO GetFromModel(ClubStatistic model)
        {
            
            return new ClubStatisticDTO()
            {
                id = model.Id,
                clubId = model.SportsClubId,
                clubName = model.SportsClub.Name,
                goalsFor = model.GoalsFor,
                goalsAganist = model.GoalsAganist,
                goalsDifferences = model.GoalsDifferences,
                clubAssists = model.ClubAssist,
                played = model.Played,
                won = model.Won,
                drawn = model.Drawn,
                lost = model.Lost,
                points = model.Points
            };
        }
    }
}
