using Microsoft.EntityFrameworkCore;

namespace ToDoList3.Models
{
    public class TodoDBContext : DbContext
    {
        public TodoDBContext(DbContextOptions<TodoDBContext> options)
            : base(options)
        {

        }

        public DbSet<Todo> Todoes { get; set; }
    }
}
