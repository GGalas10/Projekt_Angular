using Core.Models;
using Core.Repositories;
using DataAccess.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    public sealed class ErrorRepository : IErrorRepository
    {
        private readonly DataDbContext _context;
        public ErrorRepository(DataDbContext context)
        {
            _context = context;
        }
        public async Task<ErrorModel> GetErrorByIdAsync(Guid id)
        {
            var error = await _context.ErrorModels.FirstOrDefaultAsync(x=>x.Id == id);
            if (error == null)
                throw new Exception("Error_Doesnt_Exist");
            return error;
        }       

        public async Task<List<ErrorModel>> GetAllErrorsAsync()
        => await _context.ErrorModels.ToListAsync();

        public async Task AddError(ErrorModel error)
        {
            if (error == null)
                throw new Exception("Error_Cannot_Be_Null_AddError");
            _context.ErrorModels.Add(error);
            await _context.SaveChangesAsync();
        }
    }
}
