using System.ComponentModel.DataAnnotations;

namespace LADP_EFC.DTO.Users
{
    public class AddUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [Compare("Password")]
        public string PasswordConfirm { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Mi { get; set; }
        public string Status { get; set; }
        public string? Phone { get; set; }
    }
}
