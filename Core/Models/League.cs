﻿using Core.Enums;
using Core.Exceptions;

namespace Core.Models
{
    public class League
    {
        private HashSet<ClubStatistic> _clubs = new();
        private HashSet<Match> _matches = new();
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int MaxClubsInLeague { get; set; }
        public DateTime SezonStartDate { get; set; }
        public DateTime SezonEndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public LeagueStatus Status { get; set; }
        public IEnumerable<ClubStatistic> clubs => _clubs.OrderBy(x => x.Points).ToList();
        public IEnumerable<Match> matches => _matches.ToList();
        private League() { }
        public League(string name,int maxClubsInLeague, DateTime sezonStart, DateTime sezonEnd)
        {
            if (string.IsNullOrEmpty(name))
                throw new BadRequestException("League_Name_Cannot_Be_Empty");
            if (sezonEnd < sezonStart)
                throw new BadRequestException("End_Cannot_Be_Less_Than_Start");
            if (sezonEnd < DateTime.Now.AddYears(-10))
                throw new BadRequestException($"End_Cannot_Be_Less_Than_{DateTime.Now.Year - 10}");
            if (maxClubsInLeague <= 0)
                throw new BadRequestException("MaxClubs_Cannnot_Be_Less_Than_1");
            Id = Guid.NewGuid();
            Name = name;
            SezonStartDate = sezonStart;
            SezonEndDate = sezonEnd;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            if (DateTime.Now < sezonStart)
                Status = LeagueStatus.Before;
            else if (DateTime.Now >= sezonStart && DateTime.Now <= sezonEnd)
                Status = LeagueStatus.Active;
            else if (DateTime.Now > sezonEnd)
                Status = LeagueStatus.After;
        }
        public static League GetLeagueForEdit(Guid leagueId, int maxClubsInLeague,string? name, DateTime startAt,DateTime endAt)
        {
            return new() { Id = leagueId, MaxClubsInLeague = maxClubsInLeague, Name = name, SezonStartDate = startAt, SezonEndDate = endAt };
        }
        public void AddClubToLeague(SportsClub club)
        {
            if (club == null)
                throw new BadRequestException("Cannot_Add_To_League_Empty_Club");
            if (_clubs.Any(x => x.SportsClubId == club.Id))
                throw new BadRequestException("Club_Is_Already_Exist_In_This_League");
            _clubs.Add(new ClubStatistic(club, this));
        }
        public void RemoveClubFromLeague(SportsClub club)
        {
            if (club == null)
                throw new BadRequestException("Cannot_Add_To_League_Empty_Club");
            if (!_clubs.Any(x => x.SportsClubId == club.Id))
                throw new BadRequestException("Club_Is_Doesn't_Exist_In_This_League");
            _clubs.Remove(_clubs.FirstOrDefault(x => x.SportsClubId == club.Id));
        }
        public void EditLeaguePrimaryDate(League model)
        {
            if (!string.IsNullOrEmpty(model.Name) && model.Name != "$Test$")
                this.Name = model.Name;
            if(model.MaxClubsInLeague > 0)
                this.MaxClubsInLeague = model.MaxClubsInLeague;
            if (model.SezonStartDate != DateTime.MinValue)
                this.SezonStartDate = model.SezonStartDate;           
            if(model.SezonEndDate != DateTime.MinValue)
                this.SezonEndDate = model.SezonEndDate;
        }
    }
}
