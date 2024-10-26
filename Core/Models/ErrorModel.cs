namespace Core.Models
{
    public class ErrorModel
    {
        public Guid Id { get; set; }
        public string ErrorMessage { get; set; }
        public DateTime CreateDate { get; set; }
        private ErrorModel() { }
        public ErrorModel(string message)
        {
            Id = Guid.NewGuid();
            ErrorMessage = message;
            CreateDate = DateTime.Now;
        }

    }
}
