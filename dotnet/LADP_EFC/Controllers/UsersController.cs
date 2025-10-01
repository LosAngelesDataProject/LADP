using LADP_EFC.DTO.Users;
using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IRepositoryUser repository) : ControllerBase
    {
        private readonly IRepositoryUser _repository = repository;

        [HttpGet]
        public ActionResult<IEnumerable<UserDTO>> GetUsers()
        {
            try
            {
                var list = _repository.GetAll();
                if (list == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                int iCode = 500;
                return StatusCode(iCode, ex.ToString());
            }
        }

        [HttpPost]
        public ActionResult<UserDTO> CreateUser(AddUserDTO userDTO)
        {
            ObjectResult result;
            try
            {
                var item = _repository.Create(userDTO);
                result = CreatedAtAction(nameof(CreateUser), new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                int iCode = 500;
                result = StatusCode(iCode, ex.ToString());
            }
            return result;
        }

        [HttpPut("confirmuser")]
        public async Task<ActionResult> ConfirmAccount([FromQuery] string tokenId)
        {
            if (string.IsNullOrEmpty(tokenId))
            {
                Console.WriteLine("Token missing or empty");
                return BadRequest("Missing or invalid token");
            }
            try
            {
                await _repository.ConfirmAccount(tokenId);
                return Ok(new { message = "Account confirmed" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error confirming account: {ex.Message}");
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}