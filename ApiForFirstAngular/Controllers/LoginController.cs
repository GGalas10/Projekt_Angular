using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
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
        public async Task<IActionResult> Register([FromBody]RegisterUser command)
        {
            await _userService.CreateUserAsync(command);
            return Created();
        }
        [BindUserId]
        [HttpGet]
        public async Task<IActionResult> GetUserDetails()
        {
            var result = await _userService.GetUserByIdAsync(UserId);
            return Ok(result);
        }
    }
}
