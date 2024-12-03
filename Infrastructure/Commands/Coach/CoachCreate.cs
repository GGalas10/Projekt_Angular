namespace Infrastructure.Commands.Coach
{
    public class CoachCreate
    {
        public Guid ClubId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime ContractFrom { get; set; }
        public DateTime ContractTo { get; set; }
        public string WhatTrains { get; set; }
    }
}
