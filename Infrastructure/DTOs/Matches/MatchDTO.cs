using Core.Enums;
using Core.Models;
using Infrastructure.DTOs.Club;

namespace Infrastructure.DTOs.Matches
{
    public class MatchDTO
    {
        public int HomeClubGoals { get; set; }
        public int AwayClubGoals { get; set; }
        public MatchStatusEnum Status { get; set; }
        public ClubHomeDTO HomeClub { get; set; }
        public ClubHomeDTO AwayClub { get; set; }
        public DateTime StartAt { get; set; }
        public static MatchDTO GetFromModel(Match model)
        {
            return new MatchDTO()
            {
                HomeClubGoals = model.HomeClubGoals,
                HomeClub = ClubHomeDTO.GetDTOFromModel(model.HomeClub),
                AwayClubGoals = model.AwayClubGoals,
                AwayClub = ClubHomeDTO.GetDTOFromModel(model.AwayClub),
                Status = model.Status,
                StartAt = model.StartAt,
            };
        }
    }
}
