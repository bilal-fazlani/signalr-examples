using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;

namespace SignalRClient
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.CancelKeyPress += ConsoleOnCancelKeyPress;
            
            Console.WriteLine("application started ...");
            Console.WriteLine("building connection...");

            var connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5000/employees-hub")
                .WithConsoleLogger()
                .Build();
            
            Console.WriteLine("connection built");

            connection.On<Employee>("employeeUpdated", employee =>
            {
                Console.WriteLine("Employee updated : ");
                Console.WriteLine(JsonConvert.SerializeObject(employee, Formatting.Indented));
            });
            
            connection.On<Employee>("employeeInserted", employee =>
            {
                Console.WriteLine("Employee inserted : ");
                Console.WriteLine(JsonConvert.SerializeObject(employee, Formatting.Indented));
            });
            
            connection.On("employeesReset", () =>
            {
                Console.WriteLine("Employees reset");
            });

            Console.WriteLine("starting connection...");
            
            await connection.StartAsync();

            Console.WriteLine("connection started");

            Console.ReadLine();
        }

        private static void ConsoleOnCancelKeyPress(object sender, ConsoleCancelEventArgs consoleCancelEventArgs)
        {
            Console.WriteLine("INTERRUPTED");
        }
    }
}