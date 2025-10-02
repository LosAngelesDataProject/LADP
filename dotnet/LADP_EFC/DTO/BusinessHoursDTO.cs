using LADP_EFC.Data.Enitities;

namespace LADP_EFC.DTO
{
    public class BusinessHoursDTO(BusinessHours businessHour)
    {
        public int DayId { get; set; } = businessHour.DayId;
        public string Day { get; set; } = businessHour.Day.Name;
        public string? OpenTime { get; set; } = businessHour.OpenTime;
        public string? CloseTime { get; set; } = businessHour.CloseTime;

        public BusinessHours ToEntity()
        {
            return new BusinessHours()
            {
                DayId = DayId,
                OpenTime = OpenTime,
                CloseTime = CloseTime,

                Day = new Day() { Name = Day , Id = DayId}
            };
        }
    }
}
