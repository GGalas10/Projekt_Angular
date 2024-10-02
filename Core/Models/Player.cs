using Core.Enums;

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
    }
}
