using LADP_EFC.Data.Enitities;
using LADP_EFC.Data.Enitities.FoodResources;

namespace LADP_EFC.Repository.Interfaces
{
    public interface IRepositoryFoodResource
    {
        public FoodResource AddFoodResource(FoodResource foodResource);
        public IQueryable<FoodResource> GetAllFoodResources();
        public FoodResource? GetFoodResource(int id);
        public FoodResource UpdateFoodResource(FoodResource foodResource);
        public FoodResource DeleteFoodResource(FoodResource foodResource);

        public Tag AddTag(Tag tag);
        public Tag? GetTag(string name);

        public ResourceTags AddResourceTag(ResourceTags tag);
        public List<ResourceTags> GetResourceTags(int id);
        public void DeleteResourceTag(ResourceTags tag);

        public List<Day> GetAllDays();
    }
}