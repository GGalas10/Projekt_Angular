namespace Infrastructure.Commands.User
{
    public class ChangeLoginCommand()
    {
        public string newLogin { get; set; }
    }
    public class ChangePasswordCommand()
    {
        public string newPassword { get; set; }
    }
}
