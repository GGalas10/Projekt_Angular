using Core.Exceptions;
using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    internal class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;
        public UserRepository(UserDbContext context)
        {
            _context = context;
        }

        public async Task CreateUserAsync(User user)
        {
            if (user == null)
                throw new BadRequestException("User_Cannot_Be_null_CreateUser");
            var checkUser = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x=>x.Login == user.Login);
            if (checkUser != null)
                throw new BadRequestException("User_With_Login_Already_Exist");
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
                throw new BadRequestException("Cannot_Find_User_DeleteUser");
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task<List<User>> GetAllUsersAsync()
        => await _context.Users.AsNoTracking().ToListAsync();
        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == userId);
            if(user == null)
                throw new BadRequestException("Cannot_Find_User_FindById");
            return user;
        }
        public async Task<User> GetUserByLoginAsync(string login)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Login == login);
            if(user == null)
                throw new BadRequestException("Cannot_Find_User_FindById");
            return user;
        }

        public async Task ChangeUserLogin(Guid userId, string newLogin)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.Id == userId);
            if (user == null)
                throw new BadRequestException("Cannot_Find_User_FindById");
            user.Login = newLogin;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeUserPassword(Guid userId, UserPassword newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
                throw new BadRequestException("Cannot_Find_User_FindById");
            user.UserPassword = newPassword;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User> GetUserByLoginWithPasswordAsync(string login)
        {
            var user = await _context.Users.Include(x=>x.UserPassword).AsNoTracking().FirstOrDefaultAsync(x => x.Login == login);
            if (user == null)
                throw new BadRequestException("Cannot_Find_User_FindById");
            return user;
        }
    }
}
