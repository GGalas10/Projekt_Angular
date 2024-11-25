namespace Infrastructure.Commands.SportClub.Edit
{
    public struct DescriptionEdit
    {
        public string newDescription { get; set; }
        public Guid clubId { get; set; }
    }
}
