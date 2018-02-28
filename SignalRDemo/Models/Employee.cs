namespace SignalRDemo.Models
{
    public class Employee : ILiteDbModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Age { get; set; }
    }
}