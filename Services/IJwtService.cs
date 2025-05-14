using EventBookingSystem.Models;

namespace EventBookingSystem.Services
{
    public interface IJwtService
    {
        public string GenerateToken(User user, string role);
    }
}
