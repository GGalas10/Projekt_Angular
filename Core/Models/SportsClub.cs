using Core.Exceptions;

namespace Core.Models
{
    public class SportsClub
    {
        private List<Coach> _coachList = new();
        private List<Player> _playerList = new();
        private List<Staff> _staffList = new();
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Rising { get; set; }
        public IEnumerable<Player> PlayerList => _playerList;
        public IEnumerable<Coach> CoachList => _coachList;
        public IEnumerable<Staff> StaffList => _staffList;
        private SportsClub() { }
        public SportsClub(string name, string description, DateTime rising)
        {
            Name = name;
            Description = description;
            Rising = rising;
        }
        public void AddPlayer(Player player)
        {
            if (player == null)
                throw new Exception("Player_Is_Null_AddPlayer");
            _playerList.Add(player);
        }
        public void RemovePlayer(Player player)
        {
            if (player == null) throw new Exception("Player_Is_Null_RemovePlayer");
            _playerList.Remove(player);
        }
        public void AddStaff(Staff staff)
        {
            if (staff == null) throw new Exception("Staff_Is_Null_AddStaff");
            _staffList.Add(staff);
        }
        public void RemoveStaff(Staff staff)
        {
            if (staff == null) throw new Exception("Staff_Is_Null_RemoveStaff");
            _staffList.Remove(staff);
        }
        public void AddCoach(Coach coach)
        {
            if (coach == null) throw new Exception("Coach_Is_Null_AddCoach");
            _coachList.Add(coach);
        }
        public void RemoveCoach(Coach coach)
        {
            if (coach == null) throw new Exception("Coach_Is_Null_RemoveCoach");
            _coachList.Remove(coach);
        }
        public void UpdateFromModel(SportsClub model)
        {
            if (model == null)
                throw new Exception("Modal_Cannot_Be_Null_UpdateModel");
            Name = string.IsNullOrEmpty(model.Name) ? Name : model.Name; 
            Description = string.IsNullOrEmpty(model.Description) ? Description : model.Description;
            if(model.Rising != DateTime.MinValue && model.Rising != Rising)
                Rising = model.Rising;
        }
        public void UpdateName(string name)
        {
            if(string.IsNullOrEmpty(name))
                throw new BadRequestException("NewClubName_Cannot_Be_Null_Or_Empty");
            Name = name;
        }
        public void UpdateDescription(string description)
        {
            if(string.IsNullOrEmpty(description))
                throw new BadRequestException("Description_Cannot_Be_Null_Or_Empty");
            Description = description;
        }
        public void UpdateRising(DateTime rising)
        {
            if (rising >= DateTime.Now)
                throw new BadRequestException("Rising_Cannot_Be_Greater_Than_Today");
            Rising = rising;
        }
    }
}
