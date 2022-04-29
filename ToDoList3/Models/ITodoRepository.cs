namespace ToDoList3.Models
{
    public interface ITodoRepository
    {
        public IEnumerable<Todo> GetAll();
        public Todo Get(int id);
        public void Add(Todo item);
        public void Remove(int id);
        public void Update(Todo item);
    }
}
