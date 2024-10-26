namespace Core.Repositories
{
    public interface IUserClubAceessRepository
    {
        Task AddClubAccessToUserAsync(Guid userId, Guid clubId);
        Task RemoveClubAccessFromUserAsync(Guid userId, Guid clubId);
        Task<List<Guid>> GetAllUserIdAccessAsync(Guid userId);
        Task<List<Guid>> GetAllUsersIdWithAccessToClubAsync(Guid clubId);
    }
}
