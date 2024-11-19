using Core.Models;

namespace Infrastructure.Interfaces
{
    public interface IPasswordService
    {
        UserPassword CreatePassword(string password);
        bool ComparePassword(string dbPassword, string salt, string password);
    }
}
