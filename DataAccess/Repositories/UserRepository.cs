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
                throw new Exception("User_Cannot_Be_null_CreateUser");
            var checkUser = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x=>x.Login == user.Login);
            if (checkUser != null)
                throw new Exception("User_With_Login_Already_Exist");
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
                throw new Exception("Cannot_Find_User_DeleteUser");
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task<List<User>> GetAllUsersAsync()
        => await _context.Users.AsNoTracking().ToListAsync();
        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == userId);
            if(user == null)
                throw new Exception("Cannot_Find_User_FindById");
            return user;
        }
        public async Task<User> GetUserByLoginAsync(string login)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Login == login);
            if(user == null)
                throw new Exception("Cannot_Find_User_FindById");
            return user;
        }
    }
}
