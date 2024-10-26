using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers.Base
{
	[Route("/[controller]/[action]")]
	public class _BaseController : Controller
	{
		public Guid UserId { get; set; }
	}
}
