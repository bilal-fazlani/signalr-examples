using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiteDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Hubs;
using SignalRDemo.Models;

namespace SignalRDemo.Controllers
{
    [Route("/employees")]
    public class EmployeesController : Controller
    {
        private readonly IHubContext<EmployeesHub> _hubContext;
        
        private readonly LiteDatabase Db;

        private readonly LiteCollection<Employee> Collection;
        
        public EmployeesController(IHubContext<EmployeesHub> hubContext)
        {
            _hubContext = hubContext;
            
            // Open database (or create if not exits)
            Db = new LiteDatabase($"Filename={GetType().Assembly.GetName().Name}.db;Mode=Exclusive");
            
            // Get employees collection
            Collection = Db.GetCollection<Employee>(typeof(Employee).Name);
        }
        
        [Route("")]
        [HttpGet]
        public IActionResult GetListAsync([FromHeader]string socketConnectionId = null)
        {            
            // return list of employees
            return Json(Collection.FindAll().ToList());
        }
        
        [Route("{id}")]
        [HttpGet]
        public IActionResult GetEmployeeAsync(int id, [FromHeader]string socketConnectionId = null)
        {
            Employee record = Collection.FindById(id);

            if (record != null)
            {
                // find and return employee
                return Json(record);
            }

            return NotFound();
        }
        
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteEmployeeAsync(int id, [FromHeader]string socketConnectionId = null)
        {
            bool deleted = Collection.Delete(id);
            if (deleted)
            {
                await _hubContext.Clients
                    .AllExcept(new List<string>(){socketConnectionId})
                    .SendAsync("employeeDeleted", id);
                
                return Ok();
            }
            return NotFound();
        }
        
        [Route("")]
        [HttpPost]
        public async Task<IActionResult> UpsertAsync([FromBody] Employee record, [FromHeader]string socketConnectionId = null)
        {            
            // upsert
            bool inserted = Collection.Upsert(record);

            string notification = inserted ? "employeeCreated" : "employeeUpdated";
            
            await _hubContext.Clients
                .AllExcept(new List<string>(){socketConnectionId})
                .SendAsync(notification, record);
            
            // return id of saved record
            return Json(new {record.Id});
        }
        
        protected override void Dispose(bool disposing)
        {
            Db?.Dispose();
            base.Dispose(disposing);
        }
    }
}