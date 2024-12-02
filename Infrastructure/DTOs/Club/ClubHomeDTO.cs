using Core.Models;

namespace Infrastructure.DTOs.Club
{
    public sealed class ClubHomeDTO
    {
        public Guid clubId { get; set; }
        public string clubName { get; set; }
        public DateTime rising { get; set; }
        public ClubHomeDTO() { }
        public static ClubHomeDTO GetDTOFromModel(SportsClub model)
        {
            return new ClubHomeDTO
            {
                clubId = model.Id,
                clubName = model.Name,
                rising = model.Rising
            };
        }
    }
}
