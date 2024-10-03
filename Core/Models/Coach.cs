using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public sealed class Coach : _ParentPerson
    {
        public string WhatTrains { get; set; }
        [ForeignKey("CoachClub")]
        public Guid CoachClubId { get; set; }
        public SportsClub? CoachClub { get; set; }
    }
}
