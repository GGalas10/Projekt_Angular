namespace Infrastructure.Interfaces
{
    public interface IUserServices
    {
        Task LoginUserAsync();
        Task CreateUserAsync();
        Task DeleteUserAsync();
        Task GetUserByIdAsync(Guid id);
    }
}
