using System.ComponentModel.DataAnnotations;

namespace LADP_EFC.DTO.Users
{
    public class AddUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        [Compare("Password")]
        public string PasswordConfirm { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Mi { get; set; }
        public string Status { get; set; } = null!;
        public string? Phone { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
