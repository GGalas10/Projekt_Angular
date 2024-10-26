using Infrastructure.DTOs.Errors;

namespace Infrastructure.Interfaces
{
    public interface IErrorService
    {
        Task AddErrorToDatabaseAsync(string message);
        Task<List<ErrorDTO>> GetAllErrorsAsync();
        Task<ErrorDTO> GetErrorByIdAsync(Guid errorId);
    }
}
