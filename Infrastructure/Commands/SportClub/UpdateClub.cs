﻿namespace Infrastructure.Commands.SportClub
{
    public sealed class UpdateClub
    {
        public string? name { get; set; }
        public string? description { get; set; }
        public DateTime? rising { get; set; }
    }
}
