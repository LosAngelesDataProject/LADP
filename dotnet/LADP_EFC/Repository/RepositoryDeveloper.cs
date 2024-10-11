using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LADP__EFC.Data;
using LADP__EFC.DTO.Developer;
using LADP__EFC.Models;
using LADP__EFC.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using LADP__EFC;

namespace LADP__EFC.Repository
{
    public class RepositoryDeveloper : IRepositoryDeveloper
    {
        private readonly DataContext _context;

        public RepositoryDeveloper(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DeveloperDTO>> GetAllAsync()
        {
            return await _context.Developers
      .Include(d => d.Role)  
      .Select(d => new DeveloperDTO
      {
          DeveloperID = d.DeveloperID,
          Name = d.Name,
          Role = d.Role.Title,  
          LinkedInUrl = d.LinkedInUrl,
          GithubUrl = d.GithubUrl
      })
      .ToListAsync();
        }
    }
}
