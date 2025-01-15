using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LADP_EFC.Models
{
    public class BusinessHours
    {
        public int BusinessHourId { get; set; }
        public int FoodResourceId { get; set; } // Required foreign key property
        public int DayId { get; set; } // Required foreign key property
        public Day Day { get; set; } = null!; // Many-to-One relationship with Days
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }

        public FoodResource FoodResource { get; set; } = null!; // Many-to-One relationship with FoodResource
    }
}