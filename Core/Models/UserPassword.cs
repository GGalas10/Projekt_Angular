namespace Core.Models
{
    public class UserPassword
    {
        public Guid Id { get; set; }
        public string Salt { get; set; }
        public string HashedPassword { get; set; }
        private UserPassword() { }
        public UserPassword(string salt, string hashedPassword)
        {
            Id = Guid.NewGuid();
            Salt = salt;
            HashedPassword = hashedPassword;
        }
    }
}
