using Core.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public sealed class Player : _ParentPerson
    {
        public PositionEnum Position { get; set; }
        public bool HasInjury { get; set; }
        public int PlayedMinutes { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int PlayedMatches { get; set; }
        [ForeignKey("PlayerClub")]
        public Guid PlayerClubId { get; set; }
        public SportsClub? PlayerClub { get; set; }
        private Player() : base() { }
        public Player(
            PositionEnum position,DateTime contractFrom, DateTime contractTo, string firstName, string lastName, 
            bool hasInjury = false, int playedMinutes = 0 ,int yellowCard = 0, int redCard = 0, int goals = 0, int assit = 0, int playedMatches = 0
            ):base(contractFrom, contractTo, firstName, lastName)
        {
            Position = position;
            HasInjury = hasInjury;
            PlayedMinutes = playedMinutes;
            YellowCards = yellowCard;
            RedCards = redCard;
            Goals = goals;
            Assists = assit;
            PlayedMatches = playedMatches;
        }
    }
}
