using LADP_EFC.Data.Enitities.FoodResources;

namespace LADP_EFC.DTO.FoodResources
{
    public class AddFoodResourceDTO : BaseFoodResource
    {
        public AddFoodResourceDTO() { }

        public List<NameDTO> Tags { get; set; } = [];
        public List<BusinessHoursDTO> BusinessHours { get; set; } = [];

        public FoodResource ToEntity()
        {
            return new FoodResource()
            {
                Name = Name,
                Area = Area,
                StreetAddress = StreetAddress,
                City = City,
                State = State,
                Zipcode = Zipcode,
                County = County,
                Latitude = Latitude,
                Longitude = Longitude,
                Phone = Phone,
                Website = Website,
                Description = Description
            };
        }
    }
}
