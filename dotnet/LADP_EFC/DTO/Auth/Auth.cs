namespace LADP_EFC.DTO.Auth
{
    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AuthUserResponse
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
