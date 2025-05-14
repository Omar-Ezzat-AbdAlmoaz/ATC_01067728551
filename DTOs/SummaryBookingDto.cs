namespace EventBookingSystem.DTOs
{
    public class SummaryBookingDto
    {
        public int BookingId { get; set; }
        public int EventId { get; set; }
        public string EventName { get; set; }
        public string? Image { get; set; }
        public DateTime BookingDate { get; set; }
        public int TicketCount { get; set; }
    }
}
