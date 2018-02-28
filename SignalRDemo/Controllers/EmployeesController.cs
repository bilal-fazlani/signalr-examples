using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRDemo.Hubs;
using SignalRDemo.Models;

namespace SignalRDemo.Controllers
{
    [Route("/employees")]
    public class EmployeesController : LiteDbController<Employee>
    {
        private readonly IHubContext<EmployeesHub> _hubContext;

        public EmployeesController(IHubContext<EmployeesHub> hubContext)
        {
            _hubContext = hubContext;
            OnUpdated += OnEmployeeUpdated;
            OnInserted += OnEmployeeInserted;
            OnReset += OnEmployeesReset;
        }

        private async void OnEmployeesReset(object sender, EventArgs args)
        {
            await _hubContext.Clients.All.SendAsync("employeesReset");
        }

        private async void OnEmployeeUpdated(object sender, Employee employee)
        {
            await _hubContext.Clients.All.SendAsync("employeeUpdated", employee);
        }
        
        private async void OnEmployeeInserted(object sender, Employee employee)
        {
            await _hubContext.Clients.All.SendAsync("employeeInserted", employee);
        }

        protected override void Dispose(bool disposing)
        {
            OnUpdated -= OnEmployeeUpdated;
            OnInserted -= OnEmployeeInserted;
            OnReset -= OnEmployeesReset;
            base.Dispose(disposing);
        }
    }
}