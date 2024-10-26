using Core.Models;

namespace Core.Repositories
{
    public interface IUserRepository
    {
        Task CreateUserAsync(User user);
        Task DeleteUserAsync(Guid userId);
        Task<List<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid userId);
        Task<User> GetUserByLoginAsync(string login);
    }
}
