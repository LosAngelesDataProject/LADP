using LADP_EFC.Models;
using LADP_EFC.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LADP__EFC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly IRepositoryToDoItems _repositroy;
        public TodoItemsController(IRepositoryToDoItems repository)
        {
            _repositroy = repository;
        }

        // GET: api/TodoItems
        [HttpGet]
        public ActionResult<IEnumerable<TodoItemDTO>> Get()
        {
            var item = _repositroy.GetTodoItems();
            return Ok(item);
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public ActionResult<TodoItemDTO> GetById(int id)
        {
            var item = _repositroy.GetTodoItem(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<TodoItemDTO> PutTodoItem(int id, TodoItemDTO todoDTO)
        {
            if (id != todoDTO.Id)
            {
                return BadRequest();
            }

            var item = _repositroy.PutTodoItem(todoDTO);
            if (item != null)
            {
                return NoContent();
            }
            return NotFound();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<TodoItemDTO> PostTodoItem(TodoItemDTO todoDTO)
        {
            var item = _repositroy.PostTodoItem(todoDTO);
            return CreatedAtAction(nameof(Get), new { id = todoDTO.Id }, item);

        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public ActionResult<TodoItemDTO> DeleteTodoItem(int id)
        {
            var item = _repositroy.DeleteTodoItem(id);
            if (item != null)
            {
                return NoContent();
            }
            return NotFound();
        }

    }
}
