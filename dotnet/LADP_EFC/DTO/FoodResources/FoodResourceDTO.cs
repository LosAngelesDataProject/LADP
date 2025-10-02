using LADP_EFC.Data.Enitities.FoodResources;

namespace LADP_EFC.DTO.FoodResources
{
    public class FoodResourceDTO : AddFoodResourceDTO
    {
        public FoodResourceDTO() { }
        public FoodResourceDTO(FoodResource baseResource)
        {
            Name = baseResource.Name;
            Area = baseResource.Area;
            StreetAddress = baseResource.StreetAddress;
            City = baseResource.City;
            State = baseResource.State;
            Zipcode = baseResource.Zipcode;
            County = baseResource.County;
            Latitude = baseResource.Latitude;
            Longitude = baseResource.Longitude;
            Phone = baseResource.Phone;
            Website = baseResource.Website;
            Description = baseResource.Description;
        }

        public int Id { get; set; }
    }
}
