using Microsoft.AspNetCore.Mvc;
using SignalRDemo.Models;

namespace SignalRDemo.Controllers
{
    [Route("/employees")]
    public class EmployeesController : LiteDbController<Employee>
    {
        
    }
}