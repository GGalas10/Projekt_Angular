using Core.Enums;
using Core.Exceptions;

namespace Core.Models
{
    public class Match
    {
        public Guid Id { get; set; }
        public Guid HomeClubId { get; set; }
        public virtual SportsClub HomeClub { get; set; }
        public Guid AwayClubId { get; set; }
        public virtual SportsClub AwayClub { get; set; }
        public DateTime StartAt { get; set; }
        public Guid LeagueId { get; set; }
        public virtual League League { get; set; }
        public int HomeClubGoals { get; set; }
        public int AwayClubGoals { get; set; }
        public MatchStatusEnum Status { get; set; }
        private Match() { }
        public Match(Guid homeClubId, Guid awayClubId, DateTime startAt,Guid leagueId)
        {
            if (startAt < DateTime.Now)
                throw new BadRequestException("Cannot_Add_Match_Played");
            Id = Guid.NewGuid();
            LeagueId = leagueId;
            HomeClubId = homeClubId;
            HomeClubGoals = 0;
            AwayClubId = awayClubId;
            AwayClubGoals = 0;
            StartAt = startAt;
            Status = MatchStatusEnum.Before;
        }
    }
}
