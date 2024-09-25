using System;
using System.Collections.Generic;

namespace LADP__EFC.Models;

public class Developer
{
        public int DeveloperID { get; set; }
        public string Name { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? PictureUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? GithubUrl { get; set; }
    }

