using LADP_EFC.DTO.Day;

namespace LADP_EFC.DTO.BusinessHours
{
    public class BusinessHoursDTO
    {
        public DayDTO Day { get; set; } = null!;
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }
    }
}
