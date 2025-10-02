using LADP_EFC.Data;
using LADP_EFC.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using LADP_EFC.Data.Enitities;
using LADP_EFC.Data.Enitities.FoodResources;

namespace LADP_EFC.Repository
{
    public class RepositoryFoodResource(DataContext context) : IRepositoryFoodResource
    {
        private readonly DataContext _context = context;

        #region FoodResource
        /// <summary>
        /// Adds Food Resource to the database and returns with Id.
        /// </summary>
        /// <param name="foodResource"></param>
        /// <returns></returns>
        public FoodResource AddFoodResource(FoodResource foodResource)
        {
            _context.Add(foodResource);
            _context.SaveChanges();
            _context.Entry(foodResource).State = EntityState.Detached;

            return foodResource;
        }

        /// <summary>
        /// Returns a list of all FoodResources.
        /// </summary>
        public IQueryable<FoodResource> GetAllFoodResources()
        {
            return (from resource in _context.FoodResources
                    select resource)
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day);
        }

        /// <summary>
        /// Returns Food Resource based on it's Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public FoodResource? GetFoodResource(int id)
        {
            return (from resource in _context.FoodResources
                    where resource.Id == id
                    select resource)
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day)
                            .FirstOrDefault();
        }

        /// <summary>
        /// Returns the FoodReource after updating in the database.
        /// </summary>
        /// <param name="foodReource"></param>
        /// <returns></returns>
        public FoodResource UpdateFoodResource(FoodResource foodReource)
        {
            _context.Update(foodReource);
            _context.SaveChanges();
            _context.Entry(foodReource).State = EntityState.Detached;
            return foodReource;
        }

        /// <summary>
        /// Returns the FoodReource after removing from the database.
        /// </summary>
        /// <param name="foodReource"></param>
        /// <returns></returns>
        public FoodResource DeleteFoodResource(FoodResource foodReource)
        {
            _context.FoodResources.Remove(foodReource);
            _context.SaveChanges();
            return foodReource;
        }
        #endregion

        #region Tag
        /// <summary>
        /// Adds a Tag in the database.
        /// </summary>
        /// <param name="tag"></param>
        /// <returns></returns>
        public Tag AddTag(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
            _context.Entry(tag).State = EntityState.Detached;

            return tag;
        }

        /// <summary>
        /// Returns Tag based on it's Name.
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Tag? GetTag(string name)
        {
            return (from tag in _context.Tags
                    where tag.Name == name
                    select tag).FirstOrDefault();
        }
        #endregion

        #region ResourceTag
        /// <summary>
        /// Returns ResourceTag after adding in the database.
        /// </summary>
        /// <param name="tag"></param>
        /// <returns></returns>
        public ResourceTags AddResourceTag(ResourceTags tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
            _context.Entry(tag).State = EntityState.Detached;

            return tag;
        }

        /// <summary>
        /// Returns a list of all ResourceTags based on FoodResource Id.
        /// </summary>        
        /// <param name="foodResourceId"></param>
        public List<ResourceTags> GetResourceTags(int foodResourceId)
        {
            return [.. (from resourceTags in _context.ResourceTags
                            where resourceTags.FoodResourceId == foodResourceId
                        select resourceTags)];
        }

        /// <summary>
        /// Updates a FoodReource in the database.
        /// </summary>
        /// <param name="foodReource"></param>
        /// <returns></returns>
        public void DeleteResourceTag(ResourceTags tag)
        {
            _context.Remove(tag);
            _context.SaveChanges();
            _context.Entry(tag).State = EntityState.Detached;
        }
        #endregion

        #region Day
        /// <summary>
        /// Returns a list of all days.
        /// </summary>
        public List<Day> GetAllDays()
        {
            return [.. (from day in _context.Days
                    select day)];
        } 
        #endregion
    }
}