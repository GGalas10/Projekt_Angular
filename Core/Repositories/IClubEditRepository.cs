namespace Core.Repositories
{
    public interface IClubEditRepository
    {
        Task UpdateClubName(string newClubName, Guid clubId);
        Task UpdateClubDescription(string newClubDescription, Guid clubId);
        Task UpdateClubRising(DateTime newRising, Guid clubId);
    }
}
