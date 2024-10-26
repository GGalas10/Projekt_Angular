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
                    var _errorService = scope.ServiceProvider.GetRequiredService<IErrorService>();
                    await _errorService.AddErrorToDatabaseAsync(new string($"Controller: {context.Request.Path} Message: {ex.Message}"));
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsJsonAsync($"ApplicationError:{ex.Message}");
                    return;
                }
            }
        }
    }
}
