using System;

namespace Core.Models
{
    public sealed class User
    {
        public Guid Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
