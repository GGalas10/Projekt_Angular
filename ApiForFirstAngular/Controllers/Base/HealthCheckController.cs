using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers.Base
{
	[AllowAnonymous]
	public class HealthCheckController : Controller
	{
		[HttpGet("/HealthCheck")]
		public IActionResult HealthCheck()
		{
			return Ok(true);
		}
	}
}
