using Infrastructure.Comands.User;

namespace Infrastructure.Interfaces
{
    public interface IUserServices
    {
        Task LoginUserAsync(LoginUser command);
        Task CreateUserAsync(RegisterUser command);
        Task<bool> DeleteUserAsync(Guid userId);
        Task GetUserByIdAsync(Guid userId);
    }
}
