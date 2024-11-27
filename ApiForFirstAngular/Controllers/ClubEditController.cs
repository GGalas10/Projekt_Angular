using ApiForFirstAngular.Controllers.Base;
using ApiForFirstAngular.Filters;
using Infrastructure.Commands.SportClub.Edit;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    [BindUserId]
    public class ClubEditController : _BaseController
    {
        private readonly IClubEditService _clubEditService;
        public ClubEditController(IClubEditService clubEditService)
        {
            _clubEditService = clubEditService;
        }
        [HttpGet]
        public async Task<IActionResult> GetClubById(Guid clubId)
        {
            var result = await _clubEditService.GetClubById(UserId, clubId);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> EditName([FromBody]NameEdit coomand)
        {
            await _clubEditService.UpdateClubName(UserId, coomand.newName, coomand.clubId);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> EditDescription([FromBody]DescriptionEdit command)
        {
            await _clubEditService.UpdateClubDescription(UserId, command.newDescription, command.clubId);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> EditRising([FromBody]RisingEdit command)
        {
            await _clubEditService.UpdateClubRising(UserId, command.newRising, command.clubId);
            return Ok();
        }
    }
}
