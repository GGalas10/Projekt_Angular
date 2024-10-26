using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public sealed class Staff : _ParentPerson
    {
        public string JobPosition { get; set; }
        [ForeignKey("StaffClub")]
        public Guid StaffClubId { get; set; }
        public SportsClub? StaffClub { get; set; }
        private Staff():base(){}
        public Staff(string jobPosition, DateTime contractFrom, DateTime contractTo, string firstName, string lastName) : base(contractFrom, contractTo, firstName, lastName)
        {
            if (string.IsNullOrEmpty(jobPosition))
                throw new Exception("JobPosition_Cannot_Be_Null_StaffCtor");
            JobPosition = jobPosition;
        }
    }
}
