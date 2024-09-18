using LADP_EFC.DTO.FoodResource;
using LADP_EFC.Models;

namespace LADP_EFC.Repository.Interfaces
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