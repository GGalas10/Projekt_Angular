namespace Core.Models
{
    public class UserClubAccess
    {
        public int Id { get; set; }
        public Guid UserId { get;set; }
        public Guid SportsClubId { get; set; }
        public SportsClub SportsClub { get; set; }
        public UserClubAccess() { }
    }
}
