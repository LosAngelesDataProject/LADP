using LADP__EFC.DTO.FoodResource;
using LADP__EFC.Models;

namespace LADP__EFC.Repository.Interfaces
{
    public interface IRepositoryFoodResource
    {
        IEnumerable<FoodResourceDTO> GetAll();
        FoodResourceDTO GetById(int id);
        FoodResourceDTO Update(FoodResourceDTO foodResource);
        FoodResourceDTO Create(AddFoodResourceDTO insertItem);
        FoodResource Delete(int id);
    }
}

