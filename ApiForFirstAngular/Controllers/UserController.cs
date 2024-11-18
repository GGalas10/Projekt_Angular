using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.User;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    [BindUserId]
    public class UserController : _BaseController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> GetUserDetails()
        {
            var result = await _userService.GetUserByIdAsync(UserId);
            return Ok(result);
        }    
        [HttpPost]
        public async Task<IActionResult> ChangeLogin([FromBody]ChangeLoginCommand command)
        {
            await _userService.UpdateUserLogin(UserId,command.newLogin);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordCommand command)
        {
            await _userService.UpdateUserPassword(UserId, command.newPassword);
            return Ok();
        }

    }
}
