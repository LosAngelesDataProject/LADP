using LADP_EFC.DTO.Users;
using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private IRepositoryEmail _repository;

        public EmailController(IRepositoryEmail repository)
        {
            _repository = repository;
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

        
    }
}
