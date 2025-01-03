using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Contexts
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        { 
        }
        internal DbSet<SportsClub> SportsClubs { get; set; }
        internal DbSet<Coach> Coaches { get; set; }
        internal DbSet<Player> Players { get; set; }
        internal DbSet<Staff> Staffs { get; set; }
        internal DbSet<UserClubAccess> UserClubAccesses { get; set; }
        internal DbSet<ErrorModel> ErrorModels { get; set; }
        internal DbSet<League> Leagues { get; set; }
        internal DbSet<ClubStatistic> ClubStatistic { get; set; }
        internal DbSet<Match> Matches { get; set; }
    }
}
