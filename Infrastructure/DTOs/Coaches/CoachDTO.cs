using Core.Models;

namespace Infrastructure.DTOs.Coaches
{
    public class CoachDTO
    {
        public Guid id { get; set; }
        public DateTime contractFrom { get; set; }
        public DateTime contractTo { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string whatTrains { get; set; }

        public static CoachDTO GetFromModel(Coach model)
        {
            return new CoachDTO()
            {
                id = model.Id,
                contractFrom = model.ContractFrom,
                contractTo = model.ContractTo,
                firstName = model.FirstName,
                lastName = model.LastName,
                whatTrains = model.WhatTrains,
            };
        }
    }
}
