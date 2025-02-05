using LADP_EFC.DTO.Developer;

namespace LADP_EFC.Repository.Interfaces
{
    public interface IRepositoryDeveloper
    {
        IEnumerable<DeveloperDTO> GetAll();
    }
}