namespace Infrastructure.Commands.Staff
{
    public class AddStaffCommand
    {
        public Guid ClubId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime ContractFrom { get; set; }
        public DateTime ContractTo { get; set; }
        public string JobPosition { get; set; }
    }
}
