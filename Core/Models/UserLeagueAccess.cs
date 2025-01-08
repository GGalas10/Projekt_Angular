namespace Core.Models
{
    public class UserLeagueAccess
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid LeagueId { get; set; }
        public League League { get; set; }
        public UserLeagueAccess() { }
    }
}
