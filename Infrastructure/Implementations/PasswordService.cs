using Core.Models;
using Infrastructure.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Implementations
{
    public class PasswordService : IPasswordService
    {
        public UserPassword CreatePassword(string password)
        {
            var salt = CreateSalt();
            var hashedPassword = HashPassword(password, salt);
            return new(salt,hashedPassword);
        }

        public bool ComparePassword(string dbPassword,string salt, string password)
        {
            return HashPassword(password,salt) == dbPassword;
        }

        private string HashPassword(string password, string salt) 
        {
            byte[] saltedpassword = Encoding.Default.GetBytes(String.Concat(salt, password));
            var hash = SHA512.Create().ComputeHash(saltedpassword);
            return Convert.ToBase64String(hash);
        }

        private string CreateSalt()
        {
            byte[] salt = Encoding.Default.GetBytes(Guid.NewGuid().ToString());
            RandomNumberGenerator.Create().GetNonZeroBytes(salt);
            return Convert.ToBase64String(salt);
        }
    }
}
