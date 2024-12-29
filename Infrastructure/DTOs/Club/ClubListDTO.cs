using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs.Club
{
    public class ClubListDTO
    {
        public bool IsAllLoading { get; set; }
        public List<ClubHomeDTO> ClubList { get; set; }

    }
}
