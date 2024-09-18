using Microsoft.AspNetCore.Mvc;
using LADP_EFC.Repository.Interfaces;
using LADP_EFC.DTO.FoodResource;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodResourcesController : ControllerBase
    {
        private readonly IRepositoryFoodResource _repository;
        public FoodResourcesController(IRepositoryFoodResource repository)
        {
            _repository = repository;
        }

        // GET: api/FoodResources
        [HttpGet]
        public ActionResult<IEnumerable<FoodResourceDTO>> GetFoodResources()
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

        // GET: api/FoodResources/5
        [HttpGet("{id}")]
        public ActionResult<FoodResourceDTO> GetFoodResource(int id)
        {
            try
            {
                var foodResource = _repository.GetById(id);

                if (foodResource == null)
                {
                    return NotFound();
                }

                return Ok(foodResource);
            }
            catch (Exception ex)
            {
                int iCode = 500;
                return StatusCode(iCode, ex.ToString());
            }
        }

        // PUT: api/FoodResources/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<FoodResourceDTO> UpdateFoodResource(int id, FoodResourceDTO foodResource)
        {
            ObjectResult result;
            if (id != foodResource.Id)
            {
                return BadRequest();
            }
            try
            {
                var item = _repository.Update(foodResource);
                if (item == null)
                {
                    return NoContent();
                }
                else
                {
                    return Ok(item);
                }
            }
            catch (Exception ex)
            {
                int iCode = 500;
                result = StatusCode(iCode, ex.ToString());
            }
            return result;
        }

        // POST: api/FoodResources
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //public ActionResult<FoodResourceAddDTO> PostFoodResource(FoodResourceAddDTO foodResource)
        public ActionResult<FoodResourceDTO> CreateFoodResource(AddFoodResourceDTO foodResource)
        {
            ObjectResult result;
            try
            {
                var item = _repository.Create(foodResource);
                result = CreatedAtAction("GetFoodResource", new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                int iCode = 500;
                result = StatusCode(iCode, ex.ToString());
            }
            return result;
        }

        // DELETE: api/FoodResources/5
        [HttpDelete("{id}")]
        public ActionResult<FoodResourceDTO> DeleteFoodResource(int id)
        {
            try
            {
                var item = _repository.Delete(id);
                if (item == null)
                {
                    return NoContent();
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                int iCode = 500;
                return StatusCode(iCode, ex.ToString());
            }
        }
    }
}