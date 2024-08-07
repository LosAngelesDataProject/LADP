using LADP__EFC.DTO.BusinessHours;
using LADP__EFC.DTO.Tag;
using LADP__EFC.Models;

namespace LADP__EFC.DTO.FoodResource
{
    public class AddFoodResourceDTO
    {
        public string Name { get; set; } = null!;
        public string? Area { get; set; }
        public string StreetAddress { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Zipcode { get; set; } = null!;
        public string? Country { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? Phone { get; set; }
        public string? Website { get; set; }
        public string? Description { get; set; }
        public List<TagDTO> Tags { get; set; } = [];
        public List<BusinessHoursDTO> BusinessHours { get; set; } = [];
    }
}
