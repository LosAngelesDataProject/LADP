using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private IRepositoryEmail _repository;
        private IRepositoryUser _repositoryUser;

        public EmailController(IRepositoryEmail repository, IRepositoryUser repositoryUser)
        {
            _repository = repository;
            _repositoryUser = repositoryUser;
        }

        [HttpPost]
        public ActionResult TestEmail()
        {
            int code = 201;
            try
            {
                _repository.TestEmail();
            }
            catch (Exception ex)
            {
                code = 500;
            }
            return StatusCode(code);
        }

        [HttpPut("confirmEmail")]
        public async Task<ActionResult> EmailConfirm(string tokenId)
        {
            if (string.IsNullOrEmpty(tokenId))
            {
                Console.WriteLine("Token missing or empty");
                return BadRequest("Missing or invalid token");
            }
            try
            {
                await _repositoryUser.ConfirmAccount(tokenId);
                return Ok("Account confirmed");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error confirming account: {ex.Message}");
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
