using Core.Exceptions;
using Infrastructure.Interfaces;

namespace ApiForFirstAngular.Middlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IServiceScopeFactory _scopeFactory;
        public GlobalExceptionMiddleware(RequestDelegate requestDelegate, IServiceScopeFactory scopeFactory)
        {
            _next = requestDelegate;
            _scopeFactory = scopeFactory;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    try
                    {
                        var _errorService = scope.ServiceProvider.GetRequiredService<IErrorService>();
                        await _errorService.AddErrorToDatabaseAsync(new string($"Controller: {context.Request.Path} Message: {ex.Message}"));
                        
                    }catch(Exception){}

                    context.Response.StatusCode = -100;

                    if (ex is BadRequestException)
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsJsonAsync($"UserError: {ex.Message}");
                    }
                    if(ex is InternalServerException)
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsJsonAsync($"ApplicationError: {ex.Message}");
                    }


                    if (context.Response.StatusCode == -100)
                    {
                        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        await context.Response.WriteAsJsonAsync($"UnknownError: {ex.Message}");
                    }

                    context.Response.ContentType = "application/json";
                    
                    return;
                }
            }
        }
    }
}
