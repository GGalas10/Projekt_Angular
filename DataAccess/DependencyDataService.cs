using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess
{
    public static class DependencyDataService
    {
        public static IServiceCollection AddDataAccessLayer(this IServiceCollection services)
        {
            return services;
        }
    }
}
