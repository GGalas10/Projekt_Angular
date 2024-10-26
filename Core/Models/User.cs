using System;

namespace Core.Models
{
    public sealed class User
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        private User() { }
        public User(string login, string password)
        {
            Id = Guid.NewGuid();
            Login = login;
            Password = password;
        }
    }
}
