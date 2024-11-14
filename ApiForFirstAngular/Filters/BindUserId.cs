using ApiForFirstAngular.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiForFirstAngular.Filters
{
    internal sealed class BindUserId : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var configuration = context.HttpContext.RequestServices.GetService<IConfiguration>();
            var authorizationHeader = context.HttpContext.Request.Headers.Authorization.ToString();
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken = null;
            if (authorizationHeader == null)
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Result = new UnauthorizedResult();
                return;
            }

            if (!(context.Controller is _BaseController))
                return;


            var ctrl = context.Controller as _BaseController;

            var token = authorizationHeader.Substring("Bearer ".Length).Trim();
            if (token == null || token == "null")
                return;

            var validationParameters = new TokenValidationParameters
            {
                ValidIssuer = configuration["JWT:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"])),
                ValidateLifetime = true,
                ValidateIssuer = true,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
            };
            try
            {
                tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
            }
            catch (Exception ex)
            {
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.HttpContext.Response.ContentType = "application/json";
                context.Result =  new UnauthorizedObjectResult(new { message = "Token has expired" });
                return;
            }

            var readToken = tokenHandler.ReadJwtToken(token.Replace("Bearer ", ""));

            ctrl.UserId = Guid.Parse(readToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name).Value);
        }
    }
}
