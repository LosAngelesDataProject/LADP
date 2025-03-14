using LADP_EFC.Models.AppSettings;
using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private IRepositoryEmail _repository;
        private readonly BrevoApi _brevo;

        public EmailController(IRepositoryEmail repository, IOptions<BrevoApi> brevo)
        {
            _repository = repository;
            _brevo = brevo.Value;
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
