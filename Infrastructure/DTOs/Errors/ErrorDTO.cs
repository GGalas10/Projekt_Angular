using Core.Models;

namespace Infrastructure.DTOs.Errors
{
    public sealed class ErrorDTO
    {
        public string message { get; set; }
        public DateTime CreateDate { get; set; }
        public static ErrorDTO GetFromModel(ErrorModel model)
        {
            if(model == null)
                return new ErrorDTO();
            return new ErrorDTO()
            {
                CreateDate = model.CreateDate,
                message = model.ErrorMessage,
            };
        }
        public static List<ErrorDTO> GetListFromModelList(List<ErrorModel> modelList)
        {
            var newList = new List<ErrorDTO>();
            foreach(var item in modelList)
            {
                newList.Add(ErrorDTO.GetFromModel(item));
            }
            return newList;
        }
    }
}
