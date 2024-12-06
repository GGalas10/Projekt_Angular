namespace Infrastructure.Commands.Coach
{
    public class CoachEdit
    {
        public Guid CoachId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime ContractFrom { get; set; }
        public DateTime ContractTo { get; set; }
        public string WhatTrains { get; set; }
    }
}
