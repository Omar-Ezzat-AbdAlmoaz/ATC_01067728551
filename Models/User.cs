
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum Role
{
    Admin,
    User
}

namespace EventBookingSystem.Models
{
    public class User
    {
        
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }

        public ICollection<Booking>? Bookings { get; set; }

    }
}
