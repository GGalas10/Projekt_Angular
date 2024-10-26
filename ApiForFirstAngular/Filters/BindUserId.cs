using ApiForFirstAngular.Controllers.Base;
using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ApiForFirstAngular.Filters
{
    internal sealed class BindUserId : ActionFilterAttribute
	{
		public override void OnActionExecuted(ActionExecutedContext context)
		{
			var token = context.HttpContext.Request.Cookies["Bearer "];
			if (token == null)
			{
				context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
				return;
			}
			var ctrl = context.Controller as _BaseController;
			if (string.IsNullOrEmpty(token))
				ctrl.UserId = Guid.Empty;
			var userId = new JwtSecurityTokenHandler().ReadJwtToken(token.Replace("Bearer ",""));
			ctrl.UserId = Guid.Parse(userId.Claims.FirstOrDefault(x=>x.Type == ClaimTypes.Name).Value);
		}
	}
}
