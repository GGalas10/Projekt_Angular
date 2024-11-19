using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Contexts
{
    public class UserDbContext :DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options):base(options) { }
        internal DbSet<User> Users { get; set; }
        internal DbSet<UserPassword> Passwords { get; set; }
    }
}
