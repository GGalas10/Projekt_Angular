using ApiForFirstAngular.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ApiForFirstAngular.Filters
{
    internal sealed class BindUserId : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			var authorizationHeader = context.HttpContext.Request.Headers.Authorization.ToString();

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
            var readToken = new JwtSecurityTokenHandler().ReadJwtToken(token.Replace("Bearer ",""));
			ctrl.UserId = Guid.Parse(readToken.Claims.FirstOrDefault(x=>x.Type == ClaimTypes.Name).Value);
		}
	}
}
