namespace LADP_EFC.Data.Enitities
{
    public class DevelopersRole
    {
        public int RoleID { get; set; }
        public string Title { get; set; } = null!;
        public List<Developers> Developers { get; set; } = [];
    }
}