using Core.Models;

namespace Infrastructure.DTOs.Club
{
    public class ClubForSelectListDTO
    {
        public Guid clubId { get; set; }
        public string clubName { get; set; }
        public static ClubForSelectListDTO GetFromModel(SportsClub model)
        {
            return new()
            {
                clubId = model.Id,
                clubName = model.Name,
            };
        }
    }
}
