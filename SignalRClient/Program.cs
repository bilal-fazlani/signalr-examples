using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;

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
                .WithUrl("http://localhost:5000/score")
                .WithConsoleLogger()
                .Build();
            
            Console.WriteLine("connection built");

            connection.On<string>("updateScore", data =>
            {
                Console.Write($"\rScore: {data}");
            });

            Console.WriteLine("starting connection...");
            
            await connection.StartAsync();

            Console.WriteLine("connection started");

            Console.CursorVisible = false;
            Console.ReadLine();
        }

        private static void ConsoleOnCancelKeyPress(object sender, ConsoleCancelEventArgs consoleCancelEventArgs)
        {
            Console.WriteLine("INTERRUPTED");
            Console.CursorVisible = true;
        }
    }
}