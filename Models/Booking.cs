using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventBookingSystem.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }

        public int tickets { get; set; } = 0;
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("EventId")]
        public Event? Event { get; set; }

    }
}
