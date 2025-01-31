using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs.Matches
{
    public class MatchDTOForWeekList
    {
        public Guid Id { get; set; }
        public string HomeClubName { get; set; }
        public Guid HomeClubId { get; set; }
        public string AwayClubName { get; set; }
        public Guid AwayClubId { get; set; }
        public DateTime StartDate { get; set; }
        public static MatchDTOForWeekList GetDTOFromModel(Match model)
        {
            return new MatchDTOForWeekList()
            {
                Id = model.Id,
                HomeClubName = model.HomeClub.Name,
                HomeClubId = model.HomeClub.Id,
                AwayClubName = model.AwayClub.Name,
                AwayClubId = model.AwayClub.Id,
                StartDate = model.StartAt.Date,
            };
        }
    }
}
