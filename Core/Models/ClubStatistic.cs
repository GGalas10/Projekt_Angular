namespace Core.Models
{
    public class ClubStatistic
    {
        public Guid Id { get; set; }
        public Guid SportsClubId { get; set; }
        public virtual SportsClub SportsClub { get; set; }
        public Guid LeagueId { get; set; }
        public virtual League League { get; set; }
        public int GoalsFor { get; set; }
        public int GoalsAganist { get; set; }
        public int GoalsDifferences => GoalsFor - GoalsAganist;
        public int ClubAssist { get; set; }
        public int Played { get; set; }
        public int Won { get; set; }
        public int Drawn { get; set; }
        public int Lost { get; set; }
        public int Points { get; set; }
        private ClubStatistic() { }
        public ClubStatistic(SportsClub club, League league)
        {
            Id = Guid.NewGuid();
            SportsClub = club;
            League = league;
            GoalsFor = 0;
            GoalsAganist = 0;
            ClubAssist = 0;
            Played = 0;
            Won = 0;
            Drawn = 0;
            Lost = 0;
            Points = 0;
        }
        public void AddWinMatches(int goalsFor, int goalsAganist)
        {
            AddMatch(goalsFor, goalsAganist);
            Points += 3;
            Won += 1;
        }
        public void AddDrawMatches(int goalsFor, int goalsAganist)
        {
            AddMatch(goalsFor, goalsAganist);
            Points += 1;
            Drawn += 1;
        }
        public void AddLostMatches(int goalsFor, int goalsAganist)
        {
            AddMatch(goalsFor, goalsAganist);
            Lost += 1;
        }
        private void AddMatch(int goalsFor, int goalsAganist)
        {
            GoalsFor += goalsFor;
            GoalsAganist += goalsAganist;
            Played += 1;
        }
    }
}
