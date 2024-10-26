using Infrastructure.DTOs.JWT;

namespace Infrastructure.Interfaces
{
    public interface IJwtHandler
    {
        JWTDTO CreateToken(Guid userId);
    }
}
