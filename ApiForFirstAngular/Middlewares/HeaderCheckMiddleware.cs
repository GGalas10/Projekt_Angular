
using Microsoft.AspNetCore.Http.HttpResults;

namespace ApiForFirstAngular.Middlewares
{
    public class HeaderCheckMiddleware
    {
        private readonly RequestDelegate _requestDelegate;
        public HeaderCheckMiddleware(RequestDelegate requestDelegate)
        {
            _requestDelegate = requestDelegate;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.Value != null) 
                if(context.Request.Path.Value.Contains("HealthCheck")){
                    await _requestDelegate(context);
                    return;
                }
            if (context.Request.Headers.Where(x=>x.Key.ToUpper() == "FC_Header".ToUpper()).Count() <= 0)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(new {message = "Unauthorized request." });
                return;
            }
                
            await _requestDelegate(context);
        }
    }
}
