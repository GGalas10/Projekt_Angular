using Core.Models;

namespace Infrastructure.Commands.Leagues
{
    public class LeagueCreate
    {
        public string name { get; set; }
        public int maxClubsInLeague { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public League CreateModel()
        {
            return new League(this.name, this.maxClubsInLeague, this.startDate, this.endDate);
        }
    }
}
