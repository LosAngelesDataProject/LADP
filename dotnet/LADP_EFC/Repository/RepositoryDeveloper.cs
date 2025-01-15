using LADP_EFC.Data;
using LADP_EFC.DTO.Developer;
using LADP_EFC.Models;
using LADP_EFC.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LADP_EFC.Repository
{
    public class RepositoryDeveloper : IRepositoryDeveloper
    {
        private readonly DataContext _context;

        public RepositoryDeveloper(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<DeveloperDTO> GetAll()
        {
            return _context.Developers
                .Include(d => d.Role)
                .Select(d => MapDeveloper(d))
                .ToList();
        }

        private static DeveloperDTO MapDeveloper(Developers item)
        {
            var mappedItem = new DeveloperDTO
            {
                DeveloperID = item.DeveloperID,
                Name = item.Name,
                LinkedInUrl = item.LinkedInUrl,
                GithubUrl = item.GithubUrl
            };
            if (item.Role != null)
            {
                mappedItem.Role = item.Role.Title;
            }
            return mappedItem;
        }
    }
}