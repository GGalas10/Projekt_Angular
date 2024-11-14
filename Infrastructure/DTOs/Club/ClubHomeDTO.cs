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
        public static List<ClubHomeDTO> GetListDTOFromModelList(List<SportsClub> modelList)
        {
            var result = new List<ClubHomeDTO>();
            foreach (var model in modelList)
            {
                result.Add(GetDTOFromModel(model));
            }
            return result;
        }
    }
}
