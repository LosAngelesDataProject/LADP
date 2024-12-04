namespace LADP_EFC.DTO.Developer
{
    public class DeveloperDTO
    {
        public int DeveloperID { get; set; }
        public string Name { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? PictureUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? GithubUrl { get; set; }
    }
}
