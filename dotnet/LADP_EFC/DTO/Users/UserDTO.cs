namespace LADP_EFC.DTO.Users
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Mi { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
