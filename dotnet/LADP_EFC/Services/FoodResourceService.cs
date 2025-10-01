using LADP_EFC.Data.Enitities;
using LADP_EFC.Data.Enitities.FoodResources;
using LADP_EFC.DTO;
using LADP_EFC.DTO.FoodResources;
using LADP_EFC.Repository.Interfaces;

namespace LADP_EFC.Services
{
    public class FoodResourceService(IRepositoryFoodResource repository)
    {
        private readonly IRepositoryFoodResource _repository = repository;

        /// <summary>
        /// Adds Food Resource to the database and handles Tags and Business Hours.
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public FoodResource Create(AddFoodResourceDTO item)
        {
            // Create new instance of your entity without setting Id
            FoodResource newItem = _repository.AddFoodResource(item.ToEntity());

            foreach (var tagDTO in item.Tags)
            {
                // Check if tag exists
                var tag = _repository.GetTag(tagDTO.Name);
                if (tag == null) // If it does not exist, create it
                {
                    tag = _repository.AddTag(tagDTO.ToTagEntity());
                    newItem.Tags.Add(tag);
                }

                newItem.Tags.Add(tag);

                // Handle the join table ResourceTags
                var resourceTag = new ResourceTags { TagId = tag.Id, FoodResourceId = newItem.Id };
                _repository.AddResourceTag(resourceTag);
            }

            // Ensure Days are properly handled for BusinessHours
            foreach (var day in _repository.GetAllDays())
            {
                // Grab Corresponding Business Hours by that day
                var bhDTO = item.BusinessHours.FirstOrDefault(b => b.Day == day.Name);

                // For some reason doesnt exist then skip
                if (bhDTO == null)
                    continue;

                // Create BusinessHours with null OpenTime and CloseTime for missing days
                newItem.BusinessHours.Add(new BusinessHours(day, bhDTO, newItem));
            }

            // Update Instance with Tags and BusinessHours
            return _repository.UpdateFoodResource(newItem);
        }

        /// <summary>
        /// Returns Food Resource based on it's Id.
        /// </summary>        
        /// <param name="id"></param>
        public FoodResourceDTO GetFoodResource(int id)
        {
            var item = _repository.GetFoodResource(id);

            return item == null ?
                    throw new Exception($"FoodResource with Id: {id} does not exist.") :
                    new FoodResourceDTO(item);
        }

        /// <summary>
        /// Returns a list of all FoodResources.
        /// </summary>
        public List<FoodResourceDTO> GetAllFoodResources()
        {
            return [.. _repository.GetAllFoodResources().Select(fr => new FoodResourceDTO(fr))];
        }

        /// <summary>
        /// Returns the FoodReource after updating in the database and handles Tags and Business Hours.
        /// </summary>
        /// <param name="updateItem"></param>
        /// <returns></returns>
        public FoodResourceDTO Update(FoodResourceDTO updateItem)
        {
            // Get tracked FoodResource
            var item = _repository.GetFoodResource(updateItem.Id) ?? throw new Exception($"FoodResource with Id: {updateItem.Id} does not exist.");

            // Add all tags together then removes the duplicates
            var allTags = item.Tags.Select(x => new NameDTO { Name = x.Name }).Union(updateItem.Tags).Distinct().ToList();

            // Get all existing resourceTag realtionships
            var existingResourceTags = _repository.GetResourceTags(item.Id);

            foreach (var tag in allTags)
            {
                // Checks if tag needs be added
                if (updateItem.Tags.Any(t => t.Name == tag.Name))
                {
                    // Check if tag exists
                    var newTag = _repository.GetTag(tag.Name);
                    if (newTag == null) // If it does not exist, creates it
                    {
                        newTag = tag.ToTagEntity();
                        newTag = _repository.AddTag(newTag);// returns tag with Id
                    }

                    // Check if tag/resource relationship alredy exists
                    var existingTag = item.Tags.FirstOrDefault(r => r.Name == tag.Name);
                    if (existingTag == null)
                    {
                        // Adds tag to FoodResource
                        item.Tags.Add(newTag);
                        // Adds the new ResourceTags
                        _repository.AddResourceTag(new ResourceTags { TagId = newTag.Id, FoodResourceId = item.Id });
                    }

                }
                else// If not  added then first remove the relationship and then the tag from list
                {
                    // Get Tag that is no longer assocaited
                    var removeTag = item.Tags.FirstOrDefault(r => r.Name == tag.Name);
                    if (removeTag != null)
                    {
                        var resourceTag = existingResourceTags.FirstOrDefault(rt => rt.TagId == removeTag.Id);
                        if (resourceTag != null)
                        {
                            _repository.DeleteResourceTag(resourceTag);
                        }
                        item.Tags.Remove(removeTag);
                    }
                }
            }

            // Handles Updating each BusinessHour
            foreach (var businessHour in item.BusinessHours)
            {
                // Selects previous Business hour by the same day that is inputed
                var newBH = updateItem.BusinessHours.FirstOrDefault(b => b.Day == businessHour.Day.Name);
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

            return new FoodResourceDTO(_repository.UpdateFoodResource(item));
        }

        /// <summary>
        /// Returns the FoodReource after removing from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public FoodResource DeleteFoodResource(int id)
        {
            // Get tracked FoodResource
            var item = _repository.GetFoodResource(id) ?? throw new Exception($"FoodResource with Id: {id} does not exist.");

            // Ensure BusinessHours are properly deleted and not the days
            // should be handled in database cascade delete in foriegn key relationship
            // not to inlcude days

            // Enusre ResourceTags are properly deleted and not tags
            // same goes for Resource tags where cascade delete in foriegn key relationship defined
            // in database

            return _repository.DeleteFoodResource(item);
        }
    }
}
