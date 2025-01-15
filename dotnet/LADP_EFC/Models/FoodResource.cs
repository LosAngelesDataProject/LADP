using System;
using System.Collections.Generic;

namespace LADP_EFC.Models
{
    public class FoodResource
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Area { get; set; }
        public string StreetAddress { get; set; } = null!;
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Zipcode { get; set; } = null!;
        public string? County { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string? Phone { get; set; }
        public string? Website { get; set; }
        public string? Description { get; set; }
        public List<Tag> Tags { get; set; } = []; // Many-to-Many relationship with Tag through the join table ResourceTag
        public List<BusinessHours> BusinessHours { get; set; } = [];// One-to-Many relationship with BusinessHours
    }
}
