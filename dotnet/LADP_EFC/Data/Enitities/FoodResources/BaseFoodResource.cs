namespace LADP_EFC.Data.Enitities.FoodResources
{
    public class BaseFoodResource
    {
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
    }
}
