﻿namespace Infrastructure.DTOs.Token
{
    public struct LoginToken
    {
        public string jwtToken { get; set; }
        public string refreshToken { get; set; }
        public DateTime tokenExpiredAt { get; set; }
    }
}
