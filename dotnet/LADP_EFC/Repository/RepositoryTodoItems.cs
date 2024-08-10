using LADP__EFC.Models;
using LADP__EFC.Data;
using LADP__EFC.Repository.Interfaces;

namespace LADP__EFC.Repository
{
    public class RepositoryToDoItems : IRepositoryToDoItems
    {
        private readonly DataContext _context;
        public RepositoryToDoItems(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<TodoItemDTO> GetTodoItems()
        {
        /* Another way to write more closely resembling SQL queries
            var todoItems = from item in _context.TodoItems
                            select ItemToDTO(item);
                return todoItems.ToList();
        */
            return _context.TodoItems
                .Select(x => ItemToDTO(x))
                .ToList();
        }
        public TodoItemDTO GetTodoItem(int id)
        {
            var todoItem = _context.TodoItems.Find(id);
            return ItemToDTO(todoItem);
        }

        public TodoItemDTO PutTodoItem(TodoItemDTO todoDTO)
        {
            var todoItem = _context.TodoItems.Find(todoDTO.Id);
            if (todoItem != null)
            {
                todoItem.Name = todoDTO.Name;
                todoItem.IsComplete = todoDTO.IsComplete;
                _context.SaveChanges();
            }
            return ItemToDTO(todoItem);
        }

        public TodoItemDTO PostTodoItem(TodoItemDTO todoDTO)
        {
            var todoItem = new TodoItem
            {
                IsComplete = todoDTO.IsComplete,
                Name = todoDTO.Name
            };
            _context.TodoItems.Add(todoItem);
            _context.SaveChanges();
            return ItemToDTO(todoItem);
        }

        public TodoItemDTO DeleteTodoItem(int id)
        {
            var todoItem = _context.TodoItems.Find(id);
            if (todoItem != null) 
            {
                _context.TodoItems.Remove(todoItem);
                _context.SaveChanges();
            }
            return ItemToDTO(todoItem);
        }
        private static TodoItemDTO ItemToDTO(TodoItem todoItem) => new TodoItemDTO
        {
            Id = todoItem.Id,
            Name = todoItem.Name,
            IsComplete = todoItem.IsComplete
        };
    }
}
