using System.Collections.Generic;

namespace LADP__EFC.Models
{
    public class DevelopersRole
    {
        public int RoleID { get; set; }
        public string Title { get; set; } = null!;

  
        public ICollection<Developers> Developers { get; set; } = new List<Developers>();
    }
}