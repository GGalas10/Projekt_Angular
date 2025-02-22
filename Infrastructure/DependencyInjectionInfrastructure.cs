﻿using DataAccess;
using Infrastructure.Interfaces;
using Infrastructure.Implementations;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependencyInjectionInfrastructure
    {
        public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services)
        {
            services.AddDataAccessLayer();
            services.AddScoped<IJwtHandler, JwtHandler>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IErrorService, ErrorService>();
            services.AddScoped<ISportClubService, SportClubService>();
            services.AddScoped<IPlayerService, PlayerService>();
            services.AddScoped<IPasswordService, PasswordService>();
            services.AddScoped<IClubEditService, ClubEditService>();
            services.AddScoped<ICoachService, CoachService>();
            services.AddScoped<IStaffService, StaffService>();
            services.AddScoped<ILeagueService, LeagueService>();
            services.AddScoped<IMatchService, MatchService>();
            return services;
        }
    }
}
