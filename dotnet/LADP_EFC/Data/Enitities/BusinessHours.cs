using LADP_EFC.Data.Enitities.FoodResources;
using LADP_EFC.DTO;

namespace LADP_EFC.Data.Enitities
{
    public class BusinessHours 
    {
        public BusinessHours() { }    
        
        public BusinessHours(Day day, BusinessHoursDTO bhDTO, FoodResource foodResource) 
        {
            FoodResourceId = foodResource.Id;
            DayId = day.Id;
            OpenTime = bhDTO.OpenTime;
            CloseTime = bhDTO.CloseTime; 

            Day = day;
            FoodResource = foodResource;
        }

        public int BusinessHourId { get; set; }
        public int FoodResourceId { get; set; } // Required foreign key property
        public int DayId { get; set; } // Required foreign key property
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }

        public Day Day { get; set; } = null!; // Many-to-One relationship with Days
        public FoodResource FoodResource { get; set; } = null!; // Many-to-One relationship with FoodResource
    }
}