using LADP__EFC.DTO.Day;

namespace LADP__EFC.DTO.BusinessHours
{
    public class BusinessHoursDTO
    {
        public DayDTO Day { get; set; } = null!;
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }
    }
}
