namespace ToDoList3.Models
{
    public class SQLTodoRepository : ITodoRepository
    {
        private readonly TodoDBContext context;

        public SQLTodoRepository(TodoDBContext context)
        {
            this.context = context;
        }
        public void Add(Todo item)
        {
            context.Todoes.Add(item);
            context.SaveChanges();

            //return item;
        }

        public Todo Get(int id)
        {
            return context.Todoes.Find(id);
        }

        public IEnumerable<Todo> GetAll()
        {
            return context.Todoes;
        }

        public void Remove(int id)
        {
            Todo todo = context.Todoes.Find(id);

            if (todo != null)
            {
                context.Todoes.Remove(todo);
                context.SaveChanges();
            }

            //            return todo;
        }

        public void Update(Todo item)
        {
            var todo = context.Todoes.Attach(item);
            todo.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();

            //return true;
        }
    }
}
