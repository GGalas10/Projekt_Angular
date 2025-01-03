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
        public int HomeClubGoals { get; set; }
        public int AwayClubGoals { get; set; }
        public MatchStatusEnum Status { get; set; }
        private Match() { }
        public Match(SportsClub homeClub,SportsClub awayClub,DateTime startAt)
        {
            if (startAt < DateTime.Now)
                throw new BadRequestException("Cannot_Add_Match_Played");
            Id = Guid.NewGuid();
            HomeClubId = homeClub.Id;
            HomeClubGoals = 0;
            AwayClubId = awayClub.Id;
            AwayClubGoals = 0;
            StartAt = startAt;
            Status = MatchStatusEnum.Before;
        }
    }
}
