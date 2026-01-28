using LADP_EFC.Data.Enitities.Users;
using LADP_EFC.DTO.Auth;
using LADP_EFC.Repository.Interfaces;
using LADP_EFC.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LADP_EFC.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IRepositoryUser _users;
        private readonly IConfiguration _config;

        // Sets up the controller with access to the user database and app settings.
        public AuthController(IRepositoryUser users, IConfiguration config)
        {
            _users = users;
            _config = config;
        }

        // Validates user creds and attaches a secure auth cookie to the browser response.
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = _users.GetByEmail(request.Email);

            if (user == null || !PasswordHasherUtil.Verify(user, user.Password, request.Password))
            {
                return Unauthorized("Invalid email or password");
            }

            var token = GenerateJwt(user);

            Response.Cookies.Append("access_token", token, new CookieOptions
            {
                HttpOnly = true,   // Prevents JavaScript access (XSS security)
                Secure = true,     // Required for SameSite=None
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(2)
            });

            return Ok(new AuthUserResponse
            {
                Id = user.Id,
                Email = user.Email,
                Status = user.Status
            });
        }

        // Clears session by instructing browser to delete the auth cookie.
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Explicitly removing with same options used during creation
            Response.Cookies.Delete("access_token", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });
            return Ok();
        }

        // Fetches and returns the currently authenticated user's data from their token.
        [Authorize] 
        [HttpGet("me")]
        public IActionResult Me()
        {
            // If the code reaches here, [Authorize] has already validated the token
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized();
            }

            return Ok(new
            {
                Id = userId,
                Email = email,
                IsAuthenticated = true
            });
        }

        // Generates a signed JWT containing user's Id and Email to prove their identity in future requests.
        private string GenerateJwt(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
