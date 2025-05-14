using System.ComponentModel.DataAnnotations;

namespace EventBookingSystem.DTOs
{
    public class CreateEventDto
    {
        [Required(ErrorMessage = "Event name is required.")]       
        public string EventName { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        [FutureDateWithBuffer(24, ErrorMessage = "Event date must be at least 24 hours from now.")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Venue is required.")]
        public string Venue { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public decimal Price { get; set; }
        public string? Image { get; set; }
    }

    public class FutureDateWithBufferAttribute : ValidationAttribute
    {
        private readonly int _hoursBuffer;

        public FutureDateWithBufferAttribute(int hoursBuffer)
        {
            _hoursBuffer = hoursBuffer;
        }

        public override bool IsValid(object? value)
        {
            if (value is DateTime date)
            {
                return date > DateTime.Now.AddHours(_hoursBuffer);
            }
            return false;
        }
    }

}
