using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using Infrastructure.Comands.User;
using Infrastructure.DTOs.Token;
using Infrastructure.DTOs.User;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    internal class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtHandler _jwtHandler;
        private readonly IPasswordService _passwordService;
        public UserService(IUserRepository userRepository, IJwtHandler jwtHandler, IPasswordService password)
        {
            _userRepository = userRepository;
            _jwtHandler = jwtHandler;
            _passwordService = password;
        }

        public async Task<LoginToken> LoginUserAsync(LoginUser command)
        {
            if (command == null)
                throw new BadRequestException("Wrong_Credentials_Login");
            var user = await _userRepository.GetUserByLoginWithPasswordAsync(command.login);
            if (user == null)
                throw new BadRequestException("Wrong_Credentials_Login");
            if (!_passwordService.ComparePassword(user.UserPassword.HashedPassword,user.UserPassword.Salt,command.password))
                throw new BadRequestException("Wrong_Credentials_Login");

            var token = _jwtHandler.CreateToken(user.Id);

            return new LoginToken()
            {
                jwtToken = token.Token,
                refreshToken = "testRefresh",
                tokenExpiredAt = token.Expires,
            };
        }

        public async Task CreateUserAsync(RegisterUser command)
        {
            if (command == null || command.Name == null || command.Password == null)
                throw new Exception("Command_Cannot_Be_Null_CreateUser");
            var newUser = new User(command.Name,_passwordService.CreatePassword(command.Password));
            await _userRepository.CreateUserAsync(newUser);
        }

        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            if (userId == Guid.Empty)
                throw new Exception("Id_Cannot_Be_Empty_DeleteUser");
            await _userRepository.DeleteUserAsync(userId);
            return true;
        }

        public async Task<UserDTO> GetUserByIdAsync(Guid userId)
        {
            if (userId == Guid.Empty)
                throw new Exception("Id_Cannot_Be_Empty_GetUser");
            var result = await _userRepository.GetUserByIdAsync(userId);
            return new UserDTO() { name = result.Login};
        }

        public async Task UpdateUserLogin(Guid userId, string newLogin)
        {
            if (string.IsNullOrEmpty(newLogin))
                throw new BadRequestException("NewLogin_Cannot_Be_Null");
            await _userRepository.ChangeUserLogin(userId, newLogin);
            await Task.CompletedTask;
        }

        public async Task UpdateUserPassword(Guid userId, string newPassword)
        {
            if (string.IsNullOrEmpty(newPassword))
                throw new BadRequestException("NewPassword_Cannot_Be_Null");
            await _userRepository.ChangeUserPassword(userId, _passwordService.CreatePassword(newPassword));
            await Task.CompletedTask;
        }
    }
}
