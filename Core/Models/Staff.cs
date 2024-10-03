using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public sealed class Staff : _ParentPerson
    {
        public string JobPosition { get; set; }
        [ForeignKey("StaffClub")]
        public Guid StaffClubId { get; set; }
        public SportsClub? StaffClub { get; set; }
    }
}
