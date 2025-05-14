using EventBookingSystem.Data;
using EventBookingSystem.DTOs;
using EventBookingSystem.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EventBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "User")]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;  
        
        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetMyBookings()
        {
            int userId = GetCurrentUserId();

            try
            {
                var bookings = await _context.Bookings
                    .Include(b => b.Event)
                    .Where(b => b.UserId == userId)
                    .Select(b => new SummaryBookingDto
                    {
                        BookingId = b.Id,
                        EventName = b.Event!.EventName,
                        EventId = b.EventId,
                        Image = b.Event.Image,
                        BookingDate = b.BookingDate,
                        TicketCount = b.tickets
                    })
                    .ToListAsync();

                return Ok(new { Bookings = bookings });
            }
            catch (Exception ex)
            {
                return StatusCode(500,new { Message = "An error occurred",Error =  ex.Message });
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> BookEvent([FromBody] CreateBookingDto dto)
        {
            int userId = GetCurrentUserId();

            try { 
                var ev = await _context.Events.FindAsync(dto.EventId);
                if (ev == null)
                    return NotFound(new { Message = "Event not found." });

                var existingBooking = await _context.Bookings
                    .FirstOrDefaultAsync(b => b.UserId == userId && b.EventId == dto.EventId);
                if (existingBooking != null)
                {
                    existingBooking.tickets += 1;
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Booking updated!", book = true });
                }
                   
                var newbooking = new Booking
                {
                    UserId = userId,
                    EventId = dto.EventId,
                    tickets = 1,
                    BookingDate = DateTime.UtcNow
                };

                _context.Bookings.Add(newbooking);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Booking successful!",Book = true});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });
            }
        }

        

        [HttpPost("{id}")]
        public async Task<IActionResult> CanselBooking(int id)
        {
            int userId = GetCurrentUserId();
            
            var booking = await _context.Bookings.SingleOrDefaultAsync(b=> b.Id == id);
            if (booking == null) 
                return NotFound(new { Message = "Booking not found" });

            try
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Booking canceled." });
            }catch(Exception ex){
                return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });
            }

        }
    }
}
