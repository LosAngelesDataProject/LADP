using Microsoft.AspNetCore.Mvc;
using LADP__EFC.DTO.Developer;
using LADP__EFC.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LADP__EFC.Controllers
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
        public async Task<ActionResult<IEnumerable<DeveloperDTO>>> GetDevelopers()
        {
            try
            {
                var list = await _repository.GetAllAsync();
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
