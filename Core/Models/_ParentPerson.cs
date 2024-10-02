using Core.Enums;
using System;

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
    }
}
