using Core.Enums;

namespace Core.Models
{
    public class _ParentPerson
    {
        public Guid Id { get; set; }
        public StatusEnum Status { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime ContractFrom { get; set; }
        public DateTime ContractTo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public _ParentPerson() { }
        public _ParentPerson(DateTime contractFrom, DateTime contractTo, string firstName, string lastName)
        {
            Id = Guid.NewGuid();
            CreateAt = DateTime.Now;
            UpdateAt = DateTime.Now;

            if (contractFrom > contractTo)
                throw new Exception("Date_From_Cannot_Be_Greater_Than_To_ParentCtor");
            if (contractFrom == DateTime.MinValue)
                throw new Exception("DataFrom_Cannot_Be_Null_ParentCtor");
            if (contractTo == DateTime.MinValue)
                throw new Exception("DataTo_Cannot_Be_Null_ParentCtor");
            ContractFrom = contractFrom;
            ContractTo = contractTo;
            if (string.IsNullOrEmpty(firstName))
                throw new Exception("FirstName_Cannot_Be_Empty_ParentCtor");
            FirstName = firstName;
            if (string.IsNullOrEmpty(lastName))
                throw new Exception("LastName_Cannot_Be_Empty_ParentCtor");
            LastName = lastName;
        }
    }
}
