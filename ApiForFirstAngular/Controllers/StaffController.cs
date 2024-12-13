using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.Staff;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class StaffController : _BaseController
    {
        private readonly IStaffService _staffService;
        public StaffController(IStaffService staffService) 
        {
            _staffService = staffService;
        }
        [BindUserId]
        [HttpPost]
        public async Task<IActionResult> AddStaffToClub(AddStaffCommand command)
        {
            var result = await _staffService.AddStaffToClub(command);
            return Ok(result);
        }
    }
}
