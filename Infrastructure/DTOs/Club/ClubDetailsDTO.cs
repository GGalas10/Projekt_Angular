using Core.Models;
using Infrastructure.DTOs.Coaches;
using Infrastructure.DTOs.Players;

namespace Infrastructure.DTOs.Club
{
    public class ClubDetailsDTO
    {
        public string name { get; set; }
        public string description { get; set; }
        public DateTime rising { get; set; }
        public List<PlayerDetailsDTO> playerList { get; set; }
        public List<CoachDTO> coachList { get; set; }
        public List<Staff> staffList { get; set; }
        public ClubDetailsDTO() { }
        public ClubDetailsDTO(SportsClub model)
        {
            name = model.Name;
            description = model.Description;
            rising = model.Rising;
            playerList = model.PlayerList.Select(x=>PlayerDetailsDTO.GetFromModel(x)).ToList();
            coachList =  model.CoachList.Select(x=> CoachDTO.GetFromModel(x)).ToList();
            staffList = model.StaffList.ToList();
        }
    }
}
