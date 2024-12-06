using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public sealed class Coach : _ParentPerson
    {
        public string WhatTrains { get; set; }
        [ForeignKey("CoachClub")]
        public Guid CoachClubId { get; set; }
        public SportsClub? CoachClub { get; set; }
        private Coach():base() { }
        public Coach(string coachRole, DateTime contractFrom, DateTime contractTo, string firstName, string lastName):base(contractFrom, contractTo, firstName, lastName) 
        {
            if (string.IsNullOrEmpty(coachRole))
                throw new Exception("CoachRole_Cannot_Be_Null_CoachCtor");
            WhatTrains = coachRole;
        }
        public void Update(Coach model)
        {
            this.FirstName = model.FirstName;
            this.LastName = model.LastName;
            this.ContractFrom = model.ContractFrom;
            this.ContractTo = model.ContractTo;
            this.WhatTrains = model.WhatTrains;
        }
    }
}
