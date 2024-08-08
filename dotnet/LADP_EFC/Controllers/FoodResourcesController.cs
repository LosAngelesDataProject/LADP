using Microsoft.AspNetCore.Mvc;
using LADP__EFC.Models;
using LADP__EFC.Repository.Interfaces;
using NuGet.Protocol.Core.Types;
using Azure;
using LADP__EFC.DTO.FoodResource;

namespace LADP__EFC.Controllers
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
        // verify the benefits of using Async
        /* public async Task<IActionResult> InsertFoodResource(FoodResourceAddDTO insertItem)*
           {
                var id = await _repository.InsertFoodResource(insertItem);
                return Created(string.Empty, new { id });
        }
         */
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
            ObjectResult result;
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
                result = StatusCode(iCode, ex.ToString());
            }
            return result;
        }
    }
}
