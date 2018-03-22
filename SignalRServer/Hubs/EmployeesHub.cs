using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Models;

namespace SignalRDemo.Hubs
{
    public class EmployeesHub : Hub
    {
//        private LiteDatabase Db;
//        private readonly LiteCollection<Employee> Collection;
//        
//        public EmployeesHub()
//        {
//            Db = new LiteDatabase($"Filename={GetType().Assembly.GetName().Name}.db;Mode=Exclusive");
//            Collection = Db.GetCollection<Employee>(typeof(Employee).Name);
//        }
//        
//        public async Task<int> Upsert(Employee employee)
//        {
//            Collection.Upsert(employee);
//            await Clients.Others.SendAsync("employeeCreated", employee);
//            return employee.Id;
//        }
//
//        public async Task Delete(int id)
//        {
//            Collection.Delete(id);
//            await Clients.Others.SendAsync("employeeDeleted", id);
//        }
//
//        public new void Dispose()
//        {
//            Db?.Dispose();
//            base.Dispose();
//        }
    }
}