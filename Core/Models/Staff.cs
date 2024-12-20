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
        public void UpdateModel(Staff newModel)
        {
            if(newModel.FirstName != null)
                FirstName = newModel.FirstName;

            if (newModel.LastName != null)
                LastName = newModel.LastName;

            if(newModel.JobPosition != null)
                JobPosition = newModel.JobPosition;
            
            if(newModel.ContractFrom >= new DateTime(1900,01,01))
                ContractFrom = newModel.ContractFrom;

            if (newModel.ContractTo >= new DateTime(1900, 01, 01))
                ContractTo = newModel.ContractTo;
        }
    }
}
