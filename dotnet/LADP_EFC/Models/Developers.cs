using System;
using System.Collections.Generic;

namespace LADP__EFC.Models
{
    public class Developers
    {
        public int DeveloperID { get; set; }
        public string Name { get; set; } = null!;
        public string? PictureUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? GithubUrl { get; set; }

        public int RoleID { get; set; }


        public DevelopersRole? Role { get; set; }
    }
}