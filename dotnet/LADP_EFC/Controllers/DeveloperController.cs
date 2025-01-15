using LADP_EFC.DTO.Developer;
using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevelopersController : ControllerBase
    {
        private readonly IRepositoryDeveloper _repository;

        public DevelopersController(IRepositoryDeveloper repository)
        {
            _repository = repository;
        }

        // GET: api/Developers
        [HttpGet]
        public ActionResult<IEnumerable<DeveloperDTO>> GetDevelopers()
        {
            try
            {
                var list = _repository.GetAll();
                if (list == null || !list.Any())
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }
}