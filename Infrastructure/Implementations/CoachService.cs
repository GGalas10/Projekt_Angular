using Core.Exceptions;
using Core.Repositories;
using Infrastructure.Commands.Coach;
using Infrastructure.DTOs.Coaches;
using Infrastructure.Interfaces;

namespace Infrastructure.Implementations
{
    public class CoachService : ICoachService
    {
        private readonly ICoachRepository _coachRepository;
        public CoachService(ICoachRepository coachRepository)
        {
            _coachRepository = coachRepository;
        }
        public async Task<List<CoachDTO>> GetAllClubCoaches(Guid clubId)
        {
            if (clubId == Guid.Empty)
                throw new BadRequestException("ClubId_Cannot_Be_Empty");
            var result = await _coachRepository.GetAllClubCoaches(clubId);
            return result.Select(x => CoachDTO.GetFromModel(x)).ToList();
        }
        public async Task<Guid> AddCoachToClub(CoachCreate command)
        {
            if (command == null)
                throw new BadRequestException("Coach_Add_Cannot_Be_Null");
            var result = await _coachRepository.AddCoachToClub(new Core.Models.Coach(command.WhatTrains,command.ContractFrom,command.ContractTo,command.FirstName,command.LastName),command.ClubId);
            return result;
        }
        public async Task<CoachDTO> GetCoachById(Guid coachId)
        {
            if (coachId == Guid.Empty)
                throw new BadRequestException("CoachId_Cannot_Be_Empty");
            var result = await _coachRepository.GetCoachById(coachId);
            return CoachDTO.GetFromModel(result);
        }
    }
}
