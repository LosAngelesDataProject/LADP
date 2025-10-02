using LADP_EFC.DTO;

namespace LADP_EFC.Data.Enitities
{
    public class Day : NameDTO
    {
        public int Id { get; set; }

        public List<BusinessHours> BusinessHours { get; set; } = []; // One-to-Many relationship with BusinessHours
    }
}