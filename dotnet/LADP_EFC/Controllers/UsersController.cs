using LADP_EFC.DTO.Users;
using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LADP_EFC.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepositoryUser _repository;
        public UserController(IRepositoryUser repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public ActionResult<UserDTO> CreateUser(AddUserDTO userDTO)
        {
            ObjectResult result;
            try
            {
                var item = _repository.Create(userDTO);
                result = CreatedAtAction("user created", new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                int iCode = 500;
                result = StatusCode(iCode, ex.ToString());
            }
            return result;
        }
    }
}