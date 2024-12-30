namespace Core.Models
{
    public class LeagueClubAccess
    {
        public Guid Id { get; set; }
        public Guid LeagueId { get; set; }
        public Guid ClubId { get; set; }
        public LeagueClubAccess(Guid leagueId, Guid clubId)
        {
            Id = Guid.NewGuid();
            LeagueId = leagueId;
            ClubId = clubId;
        }
    }
}
