using LADP_EFC.DTO.BusinessHours;
using LADP_EFC.DTO.Tag;
using LADP_EFC.Models;

namespace LADP_EFC.DTO.FoodResource
{
    public class FoodResourceDTO
    {
        public int Id { get; set; }
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
