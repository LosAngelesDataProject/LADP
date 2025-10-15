using System.Diagnostics.Metrics;
using System.Reflection.Emit;
using LADP_EFC.Data.Enitities;
using LADP_EFC.Data.Enitities.FoodResources;
using Mono.TextTemplating;

namespace LADP_EFC.DTO
{
    public class NameDTO
    {
        public string Name { get; set; } = null!;

        public Tag ToTagEntity()
        {
            return new Tag()
            {
                Name = Name
            };
        }

        public Day ToDayEntity()
        {
            return new Day()
            {
                Name = Name
            };
        }
    }
}
