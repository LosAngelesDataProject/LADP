using Microsoft.AspNetCore.Mvc;
using LADP_EFC.DTO.FoodResources;
using LADP_EFC.Services;

namespace LADP_EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodResourcesController(FoodResourceService service) : ControllerBase
    {
        private readonly FoodResourceService _service = service;

        [HttpGet]
        public ActionResult<IEnumerable<FoodResourceDTO>> GetAll()
        {
            try
            {
                var list = _service.GetAllFoodResources();
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

        [HttpGet("{id}")]
        public ActionResult<FoodResourceDTO> GetFoodResource(int id)
        {
            try
            {
                var foodResource = _service.GetFoodResource(id);

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
                var item = _service.Update(foodResource);
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

        [HttpPost]
        public ActionResult<FoodResourceDTO> CreateFoodResource(AddFoodResourceDTO foodResource)
        {
            ObjectResult result;
            try
            {
                var item = _service.Create(foodResource);
                result = CreatedAtAction("GetFoodResource", new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                int iCode = 500;
                result = StatusCode(iCode, ex.ToString());
            }
            return result;
        }

        [HttpDelete("{id}")]
        public ActionResult<FoodResourceDTO> DeleteFoodResource(int id)
        {
            try
            {
                var item = _service.DeleteFoodResource(id);
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