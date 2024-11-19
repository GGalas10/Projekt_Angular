using System;

namespace Core.Models
{
    public sealed class User
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public Guid UserPasswordId { get; set; }
        public UserPassword UserPassword { get; set; }
        private User() { }
        public User(string login, UserPassword password)
        {
            Id = Guid.NewGuid();
            Login = login;
            UserPassword = password;
        }
    }
}
