using Core.Models;

namespace Core.Repositories
{
    public interface IErrorRepository
    {
        Task<ErrorModel> GetErrorByIdAsync(Guid id);
        Task<List<ErrorModel>> GetAllErrorsAsync();
        Task AddError(ErrorModel error);
    }
}
