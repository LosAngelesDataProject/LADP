using Azure;
using LADP__EFC.Data;
using LADP__EFC.DTO.Tag;
using LADP__EFC.DTO.Day;
using LADP__EFC.DTO.FoodResource;
using LADP__EFC.DTO.BusinessHours;
using LADP__EFC.Models;
using LADP__EFC.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Mono.TextTemplating;
using System.Diagnostics.Metrics;
using System.Reflection.Emit;
using Microsoft.CodeAnalysis.Elfie.Model.Tree;

namespace LADP__EFC.Repository
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
                //_context.SaveChanges();
            }

            // Enusre ResourceTags are properly deleted and not tags
            //foreach (var tag in item.Tags)
            //{
            //    var resourceTag = _context.ResourceTags.FirstOrDefault(rt => rt.TagId == tag.Id && rt.FoodResourceId == item.Id);
            //    _context.ResourceTags.Remove(resourceTag);
            //    //_context.SaveChanges();
            //}
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

        // why not use async
        // public async Task<in>t PostFoodResource(InsertUpdateItem foodResource)
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
                Country = insertItem.Country,
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
                // Handle the join table ResourceTags
                var resourceTag = new ResourceTags { TagId = tag.Id, FoodResourceId = newFoodResource.Id };
                _context.ResourceTags.Add(resourceTag);
                newFoodResource.Tags.Add(tag);
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

        public FoodResourceDTO Update(FoodResourceDTO foodResource)
        {
            var item = _context.FoodResources
                            .Include(r => r.Tags)
                            .Include(b => b.BusinessHours).ThenInclude(bh => bh.Day)
                            .FirstOrDefault(fr => fr.Id == foodResource.Id);
            if (item == null)
            {
                throw new Exception($"FoodResource with Id: {foodResource.Id} does not exist.");
            }

            item.Name = foodResource.Name;
            item.Area = foodResource?.Area;
            item.StreetAddress = foodResource.StreetAddress;
            item.City = foodResource.City;
            item.State = foodResource.State;
            item.Zipcode = foodResource.Zipcode;
            item.Country = foodResource?.Country;
            item.Latitude = foodResource.Latitude;
            item.Longitude = foodResource.Longitude;
            item.Phone = foodResource?.Phone;
            item.Website = foodResource?.Website;
            item.Description = foodResource?.Description;

            // Clear existing ResourceTags before update
            var existingResourceTags = _context.ResourceTags.Where(rt => rt.FoodResourceId == item.Id).ToList();
            foreach (var resourceTag in existingResourceTags)
            {
                _context.ResourceTags.Remove(resourceTag);
            }

            // Add tags and ResourceTags
            foreach (var tag in foodResource.Tags)
            {
                // Check if tag exists
                var newTag = _context.Tags.FirstOrDefault(t => t.Name == tag.Name);
                if (newTag == null) // If it does not exist, create it
                {
                    newTag = new Tag { Name = tag.Name };
                    _context.Tags.Add(newTag);
                    _context.SaveChanges(); // Save to get the tag ID
                }

                // Add the new ResourceTags relationship
                var resourceTag = new ResourceTags { TagId = newTag.Id, FoodResourceId = item.Id };
                _context.ResourceTags.Add(resourceTag);

                item.Tags.Add(newTag);
            }

            // Ensure Days are properly handled for BusinessHours
            // Ensure Days are properly handled for BusinessHours
            var daysOfWeek = _context.Days.ToList();
            //foreach (var day in item.BusinessHours)
            foreach (var day in daysOfWeek)
            {
                var newBH = foodResource.BusinessHours.FirstOrDefault(b => b.Day.Name == day.Name);
                var prevBH = item.BusinessHours.FirstOrDefault(b => b.Day.Name == day.Name);

                if (newBH != null)
                {
                    if (prevBH != null)
                    {
                        prevBH.OpenTime = newBH.OpenTime;
                        prevBH.CloseTime = newBH.CloseTime;
                    }
                    else
                    {
                        item.BusinessHours.Add(new BusinessHours
                        {
                            Day = day,
                            OpenTime = newBH.OpenTime,
                            CloseTime = newBH.CloseTime,
                            FoodResource = item
                        });
                    }
                }
                else if (prevBH != null)
                {
                    // If there is no new business hour for this day, set times to null
                    prevBH.OpenTime = null;
                    prevBH.CloseTime = null;
                }
            }

            _context.SaveChanges();
            return MapFoodResource(item);
        }

        private static FoodResourceDTO MapFoodResource(FoodResource item)
        {
            var mappedItem =  new FoodResourceDTO
            {
                Id = item.Id,
                Name = item.Name,
                Area = item.Area,
                StreetAddress = item.StreetAddress,
                City = item.City,
                State = item.State,
                Zipcode = item.Zipcode,
                Country = item.Country,
                Latitude = item.Latitude,
                Longitude = item.Longitude,
                Phone = item.Phone,
                Website = item.Website,
                Description = item.Description            };
            if(item.Tags.Count > 0)
            {
                foreach(var tag in item.Tags)
                {
                    mappedItem.Tags.Add(new TagDTO { Name = tag.Name });
                }
            }
            foreach (var bh in item.BusinessHours)
            {
                mappedItem.BusinessHours.Add(new BusinessHoursDTO
                {
                    Day = new DayDTO { Name = bh.Day.Name},
                    OpenTime = bh?.OpenTime,
                    CloseTime = bh?.CloseTime,
                });
            }
            return mappedItem;
        }
    }
}
