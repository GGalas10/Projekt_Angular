using Core.Enums;
using Core.Exceptions;

namespace Infrastructure.Commands.SportClub.Player
{
    public class AddPlayerCommand
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime contractFrom { get; set; }
        public DateTime contractTo { get; set; }
        public PositionEnum position { get; set; }
        public bool hasInjury { get; set; }
        public int playedMinutes { get; set; }
        public int yellowCards { get; set; }
        public int redCards { get; set; }
        public int goals { get; set; }
        public int assists { get; set; }
        public int playedMatches { get; set; }
        public Guid clubId { get; set; }
        public int playerNumber { get; set; }

        public void IsValid()
        {
            if (string.IsNullOrEmpty(this.firstName))
                throw new BadRequestException("Player_First_Name_Cannot_Be_Null");
            if (string.IsNullOrEmpty(this.lastName))
                throw new BadRequestException("Player_Last_Name_Cannot_Be_Null");
            if (this.contractTo < this.contractFrom)
                throw new BadRequestException("Contract_Cannot_End_Before_Start");
        }
        public static Core.Models.Player GetFromCommand(AddPlayerCommand command)
        {         
            return new Core.Models.Player(
                command.position,
                command.contractFrom,
                command.contractTo,
                command.firstName,
                command.lastName,
                command.hasInjury,
                command.playedMinutes < 0?0:command.playedMinutes,
                command.yellowCards < 0 ? 0 : command.yellowCards,
                command.redCards < 0 ? 0 : command.redCards,
                command.goals < 0 ? 0 : command.goals,
                command.assists < 0 ? 0 : command.assists,
                command.playedMatches < 0 ? 0 : command.playedMatches,
                command.playerNumber <0 ? 0:command.playerNumber)
            { PlayerClubId = command.clubId};
        }
    }
}
