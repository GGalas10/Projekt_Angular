using ApiForFirstAngular.Controllers.Base;
using Infrastructure.Commands.SportClub.Edit;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ApiForFirstAngular.Controllers
{
    public class ClubEditController : _BaseController
    {
        private readonly IClubEditService _clubEditService;
        public ClubEditController(IClubEditService clubEditService)
        {
            _clubEditService = clubEditService;
        }
        [HttpPost]
        public async Task<IActionResult> EditName([FromBody]NameEdit coomand)
        {
            await _clubEditService.UpdateClubName(coomand.newName, coomand.clubId);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> EditDescription([FromBody]DescriptionEdit command)
        {
            await _clubEditService.UpdateClubDescription(command.newDescription, command.clubId);
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> EditRising([FromBody]RisingEdit command)
        {
            await _clubEditService.UpdateClubRising(command.newRising, command.clubId);
            return Ok();
        }
    }
}
