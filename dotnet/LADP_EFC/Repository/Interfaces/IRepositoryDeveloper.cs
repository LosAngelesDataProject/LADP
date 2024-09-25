using LADP__EFC.DTO.Developer;
using LADP__EFC.Models;

namespace LADP__EFC.Repository.Interfaces
{
    public interface IRepositoryDeveloper
    {
        Task<IEnumerable<DeveloperDTO>> GetAllAsync();
    }
}