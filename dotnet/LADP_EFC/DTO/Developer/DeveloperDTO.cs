using LADP__EFC.DTO.BusinessHours;
using LADP__EFC.DTO.Tag;
using LADP__EFC.Models;

namespace LADP__EFC.DTO.Developer
{
    public class DeveloperDTO
    {
        public int DeveloperID { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string? PictureUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? GithubUrl { get; set; }
    }
}
