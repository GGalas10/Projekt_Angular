using System;
using System.Collections;
using System.Collections.Generic;

namespace Core.Models
{
    public class SportsClub
    {
        private List<Coach> _coachList;
        private List<Player> _playerList;
        public List<Staff> _staffList;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Rising { get; set; }
        public IEnumerable<Player> PlayerList => _playerList;
        public IEnumerable<Coach> CoachList => _coachList;
        public IEnumerable<Staff> StaffList => _staffList;
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
    }
}
