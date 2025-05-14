using System.ComponentModel.DataAnnotations;

namespace EventBookingSystem.DTOs
{
    public class CreateBookingDto
    {
        [Required(ErrorMessage =("Event id is required."))]
        public int EventId { get; set; }
    }
}
