using LADP_EFC.Data.Enitities.FoodResources;
using LADP_EFC.DTO;

namespace LADP_EFC.Data.Enitities;

public class Tag : NameDTO
{
    public int Id { get; set; }

    public List<FoodResource> FoodResources { get; set; } = [];  // Many-to-One relationship with ResourceTags
}