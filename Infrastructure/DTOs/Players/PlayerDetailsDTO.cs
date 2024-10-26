using Core.Enums;
using Core.Models;

namespace Infrastructure.DTOs.Players
{
    public sealed class PlayerDetailsDTO
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public DateTime contractFrom { get; set; }
        public DateTime contractTo { get; set; }
        public string clubName { get; set; }
        public bool hasInjury { get; set; }
        public int playedMinutes { get; set; }
        public int yellowCards { get; set; }
        public int redCards { get; set; }
        public int goals { get; set; }
        public int assists { get; set; }
        public int playedMatches { get; set; }
        public PositionEnum position { get; set; }
        public PlayerDetailsDTO() { }
        public static PlayerDetailsDTO GetFromModel(Player model)
        {
            return new PlayerDetailsDTO()
            {
                firstName = model.FirstName,
                lastName = model.LastName,
                contractFrom = model.ContractFrom,
                contractTo = model.ContractTo,
                clubName = model.PlayerClub != null ? model.PlayerClub.Name : "Brak",
                hasInjury = model.HasInjury,
                playedMinutes = model.PlayedMinutes,
                yellowCards = model.YellowCards,
                redCards = model.RedCards,
                goals = model.Goals,
                assists = model.Assists,
                playedMatches = model.PlayedMatches,
                position = model.Position,
            };
        }
    }
}
