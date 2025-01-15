using LADP_EFC.Data;
using LADP_EFC.DTO.BusinessHours;
using LADP_EFC.DTO.Day;
using LADP_EFC.DTO.FoodResource;
using LADP_EFC.DTO.Tag;
using LADP_EFC.Models;
using LADP_EFC.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LADP_EFC.Repository
{
    public class RepositoryFoodResource : IRepositoryFoodResource
    {
        private readonly DataContext _context;

        public RepositoryFoodResource(DataContext context)
        {
            _context = context;
        }
        public FoodResource Delete(int id)
        {
            var item = _context.FoodResources
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day)
                            .FirstOrDefault(fr => fr.Id == id);
            if (item == null)
            {
                throw new Exception($"FoodResource with Id: {id} does not exist.");
            }

            // Ensure BusinessHours are properly deleted and not the days
            foreach (var bh in item.BusinessHours)
            {
                _context.BusinessHours.Remove(bh);
            }

            // Enusre ResourceTags are properly deleted and not tags
            var resourceTags = _context.ResourceTags.Where(rt => rt.FoodResourceId == item.Id).ToList();
            foreach (var resourceTag in resourceTags)
            {
                _context.ResourceTags.Remove(resourceTag);
            }

            _context.FoodResources.Remove(item);
            _context.SaveChanges();
            return item;
        }

        public FoodResourceDTO GetById(int id)
        {
            var item = _context.FoodResources
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day)
                            .FirstOrDefault(fr => fr.Id == id);
            if (item == null)
            {
                throw new Exception($"FoodResource with Id: {id} does not exist.");
            }
            return MapFoodResource(item);
        }

        public IEnumerable<FoodResourceDTO> GetAll()
        {
            var item = _context.FoodResources
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day)
                            .Select(x => MapFoodResource(x))
                            .ToList();
            return item;
        }

        public FoodResourceDTO Create(AddFoodResourceDTO insertItem)
        {
            // Create new instance of your entity without setting Id
            var newFoodResource = new FoodResource
            {
                Name = insertItem.Name,
                Area = insertItem.Area,
                StreetAddress = insertItem.StreetAddress,
                City = insertItem.City,
                State = insertItem.State,
                Zipcode = insertItem.Zipcode,
                County = insertItem.County,
                Latitude = insertItem.Latitude,
                Longitude = insertItem.Longitude,
                Phone = insertItem.Phone,
                Website = insertItem.Website,
                Description = insertItem.Description,
            };

            // Add newFoodResource to context and save changes to get its ID
            _context.FoodResources.Add(newFoodResource);
            _context.SaveChanges();

            foreach (var tagDTO in insertItem.Tags)
            {
                // Check if tag exists
                var tag = _context.Tags.FirstOrDefault(t => t.Name == tagDTO.Name);
                if (tag == null) // If it does not exist, create it
                {
                    tag = new Tag { Name = tagDTO.Name };
                    _context.Tags.Add(tag);
                    _context.SaveChanges(); // Save to get the tag ID
                }

                newFoodResource.Tags.Add(tag);
                // Handle the join table ResourceTags
                var resourceTag = new ResourceTags { TagId = tag.Id, FoodResourceId = newFoodResource.Id };
                _context.ResourceTags.Add(resourceTag);
            }

            // Ensure Days are properly handled for BusinessHours
            var allDays = _context.Days.ToList();
            foreach (var day in allDays)
            {
                var bhDTO = insertItem.BusinessHours.FirstOrDefault(b => b.Day.Name == day.Name);
                // Create BusinessHours with null OpenTime and CloseTime for missing days
                newFoodResource.BusinessHours.Add(new BusinessHours
                {
                    Day = day,
                    OpenTime = bhDTO?.OpenTime,
                    CloseTime = bhDTO?.CloseTime,
                    FoodResource = newFoodResource
                });
            }

            _context.SaveChanges();
            return MapFoodResource(newFoodResource);
        }

        public FoodResourceDTO Update(FoodResourceDTO updateItem)
        {
            var item = _context.FoodResources
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day)
                            .FirstOrDefault(fr => fr.Id == updateItem.Id);
            if (item == null)
            {
                throw new Exception($"FoodResource with Id: {updateItem.Id} does not exist.");
            }

            item.Name = updateItem.Name;
            item.Area = updateItem?.Area;
            item.StreetAddress = updateItem.StreetAddress;
            item.City = updateItem.City;
            item.State = updateItem.State;
            item.Zipcode = updateItem.Zipcode;
            item.County = updateItem?.County;
            item.Latitude = updateItem.Latitude;
            item.Longitude = updateItem.Longitude;
            item.Phone = updateItem?.Phone;
            item.Website = updateItem?.Website;
            item.Description = updateItem?.Description;

            //adds all tags together and removes duplicates
            var allTags = item.Tags.Select(x => new TagDTO { Name = x.Name }).Union(updateItem.Tags).Distinct().ToList();

            // selects existing resourceTag realtionships
            var existingResourceTags = _context.ResourceTags.Where(rt => rt.FoodResourceId == item.Id).ToList();
            foreach (var tag in allTags)
            {
                //checks if tag will be added
                if (updateItem.Tags.Any(t => t.Name == tag.Name))
                {
                    // Check if tag exists
                    var newTag = _context.Tags.FirstOrDefault(t => t.Name == tag.Name);
                    if (newTag == null) // If it does not exist, creates it
                    {
                        newTag = new Tag { Name = tag.Name };
                        _context.Tags.Add(newTag);
                        _context.SaveChanges(); // Save to get the tag ID
                    }

                    // check if tag + relationship alredy exists
                    var existingTag = item.Tags.FirstOrDefault(r => r.Name == tag.Name);
                    if (existingTag == null)
                    {
                        // adds tag to list
                        item.Tags.Add(newTag);
                        //Add the new ResourceTags relationship
                        _context.ResourceTags.Add(new ResourceTags { TagId = newTag.Id, FoodResourceId = item.Id });
                    }

                }
                else// if not going to be added then remove the relationship and then the tag from list
                {
                    var removeTag = item.Tags.FirstOrDefault(r => r.Name == tag.Name);
                    if (removeTag != null)
                    {
                        var resourceTag = existingResourceTags.FirstOrDefault(rt => rt.TagId == removeTag.Id);
                        if (resourceTag != null)
                        {
                            _context.ResourceTags.Remove(resourceTag);
                        }
                        item.Tags.Remove(removeTag);
                    }
                }
            }

            // updates each BusinessHour
            foreach (var businessHour in item.BusinessHours)
            {
                // Selects previous Business hour by the same day that is inputed
                var newBH = updateItem.BusinessHours.FirstOrDefault(b => b.Day.Name == businessHour.Day.Name);
                if (newBH == null)// if no day sent then sets that day to null
                {
                    businessHour.OpenTime = null;
                    businessHour.CloseTime = null;
                }
                else// updates the day given
                {
                    businessHour.OpenTime = newBH?.OpenTime;
                    businessHour.CloseTime = newBH?.CloseTime;
                }
            }

            _context.SaveChanges();
            return MapFoodResource(item);
        }

        private static FoodResourceDTO MapFoodResource(FoodResource item)
        {
            var mappedItem = new FoodResourceDTO
            {
                Id = item.Id,
                Name = item.Name,
                Area = item.Area,
                StreetAddress = item.StreetAddress,
                City = item.City,
                State = item.State,
                Zipcode = item.Zipcode,
                County = item.County,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                Phone = item.Phone,
                Website = item.Website,
                Description = item.Description
            };
            if (item.Tags.Count > 0)
            {
                foreach (var tag in item.Tags)
                {
                    mappedItem.Tags.Add(new TagDTO { Name = tag.Name });
                }
            }
            foreach (var bh in item.BusinessHours)
            {
                mappedItem.BusinessHours.Add(new BusinessHoursDTO
                {
                    Day = new DayDTO { Name = bh.Day.Name },
                    OpenTime = bh?.OpenTime,
                    CloseTime = bh?.CloseTime,
                });
            }
            return mappedItem;
        }
    }
}