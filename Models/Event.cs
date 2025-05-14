using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventBookingSystem.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public DateTime Date { get; set; }
        public string Venue { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; }

        public ICollection<Booking>? Bookings { get; set; }
    }
}
