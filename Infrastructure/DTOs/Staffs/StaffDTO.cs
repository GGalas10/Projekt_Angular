using Core.Models;

namespace Infrastructure.DTOs.Staffs
{
    public class StaffDTO
    {
        public Guid id { get; set; }
        public DateTime contractFrom { get; set; }
        public DateTime contractTo { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string jobPosition { get; set; }

        public static StaffDTO GetFromModel(Staff model)
        {
            return new StaffDTO()
            {
                id = model.Id,
                contractFrom = model.ContractFrom,
                contractTo = model.ContractTo,
                firstName = model.FirstName,
                lastName = model.LastName,
                jobPosition = model.JobPosition,
            };
        }
    }
}
