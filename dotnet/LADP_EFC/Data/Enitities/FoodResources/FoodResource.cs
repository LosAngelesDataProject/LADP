namespace LADP_EFC.Data.Enitities.FoodResources
{
    public class FoodResource : BaseFoodResource
    {
        public int Id { get; set; }

        public List<Tag> Tags { get; set; } = []; // Many-to-Many relationship with Tag through the join table ResourceTag
        public List<BusinessHours> BusinessHours { get; set; } = [];// One-to-Many relationship with BusinessHours
    }
}