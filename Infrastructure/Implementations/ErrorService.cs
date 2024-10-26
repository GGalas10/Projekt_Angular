using Core.Models;
using Core.Repositories;
using Infrastructure.DTOs.Errors;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public sealed class ErrorService : IErrorService
    {
        private readonly IErrorRepository _errorRepository;
        public ErrorService(IErrorRepository errorRepository)
        {
            _errorRepository = errorRepository;
        }
        public async Task AddErrorToDatabaseAsync(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                throw new Exception("");
            await _errorRepository.AddError(new ErrorModel(message));

        }

        public async Task<List<ErrorDTO>> GetAllErrorsAsync()
        => ErrorDTO.GetListFromModelList(await _errorRepository.GetAllErrorsAsync());

        public async Task<ErrorDTO> GetErrorByIdAsync(Guid errorId)
        => ErrorDTO.GetFromModel(await _errorRepository.GetErrorByIdAsync(errorId));
    }
}
