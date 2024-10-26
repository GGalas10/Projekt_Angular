using ApiForFirstAngular.Controllers.Base;
using Infrastructure.Comands.User;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class LoginController : _BaseController
	{
        private readonly IUserService _userService;
        public LoginController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginUser command)
        {
            var token = await _userService.LoginUserAsync(command);
            return Ok(token);
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterUser command)
        {
            await _userService.CreateUserAsync(command);
            return Created();
        }
    }
}
