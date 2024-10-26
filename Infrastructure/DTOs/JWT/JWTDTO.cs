namespace Infrastructure.DTOs.JWT
{
    public sealed class JWTDTO
    {
        public string Token { get; set; }
        public long Expires { get; set; }
    }
}
