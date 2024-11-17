using Infrastructure.Comands.User;
using Infrastructure.DTOs.Token;
using Infrastructure.DTOs.User;

namespace Infrastructure.Interfaces
{
    public interface IUserService
    {
        Task<LoginToken> LoginUserAsync(LoginUser command);
        Task CreateUserAsync(RegisterUser command);
        Task<bool> DeleteUserAsync(Guid userId);
        Task<UserDTO> GetUserByIdAsync(Guid userId);
        Task UpdateUserLogin(Guid userId, string newLogin);
        Task UpdateUserPassword(Guid userId, string newPassword);
    }
}
