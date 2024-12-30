using Core.Repositories;
using DataAccess.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess
{
    public static class DependencyInjectionDataService
    {
        public static IServiceCollection AddDataAccessLayer(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IErrorRepository, ErrorRepository>();
            services.AddScoped<IClubRepository, ClubRepository>();
            services.AddScoped<IUserClubAceessRepository, UserClubAceessRepository>();
            services.AddScoped<IPlayerRepository, PlayerRepository>();
            services.AddScoped<IClubEditRepository, ClubEditRepository>();
            services.AddScoped<ICoachRepository, CoachRepository>();
            services.AddScoped<IStaffRepository, StaffRepository>();
            services.AddScoped<ILeagueRepository, LeagueRepository>();
            return services;
        }
    }
}
