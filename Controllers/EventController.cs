using EventBookingSystem.Data;
using EventBookingSystem.DTOs;
using EventBookingSystem.Models;
using EventBookingSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace EventBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EventController : ControllerBase
    {

        private readonly AppDbContext _context;
        //private readonly IJwtService _JwtService;

        public EventController(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            //_JwtService = jwtService;
        }

        [HttpGet]        
        public async Task<IActionResult> AllEvents()
        {
            try
            {
                var events = await _context.Events.ToListAsync();

                return Ok(new { Events = events });
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Database error: " + ex.Message);
                return StatusCode(500, "Something went wrong. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");

            }
            
        }

        [HttpGet("{id}")]
        
        public async Task<IActionResult> GetEvent(int id)
        {
            try
            {
                var ev = await _context.Events.FindAsync(id);
                if (ev == null)
                {
                    return NotFound(new { Message = "Event not found." });
                }
                return Ok(ev);
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Database error: " + ex.Message);
                return StatusCode(500, "Something went wrong. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");

            }

            
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm]CreateEventDto dto, [FromForm] IFormFile? image)
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            try
            {
                string fileName;

                if (image != null && image.Length > 0)
                {
                    Console.WriteLine("image length");
                    fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }
                }
                else
                {
                    
                    fileName = "default.png";
                }

                var newEvent = new Event
                {
                    EventName = dto.EventName,
                    Description = dto.Description,
                    Category = dto.Category,
                    Date = dto.Date,
                    Price = dto.Price,
                    Venue = dto.Venue,
                    Image = "/images/" + fileName,
                };

                _context.Events.Add(newEvent);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Event created successfully", newEvent });
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Database error: " + ex.Message);
                return StatusCode(500, "Something went wrong. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");

            }
            
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateEventDto dto, [FromForm] IFormFile? image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var currntEvent = await _context.Events.FindAsync(id);
                if (currntEvent == null)
                {
                    return NotFound(new { message = "Event not found" });
                }

                
                if (image != null && image.Length > 0)
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    currntEvent.Image = "/images/" + fileName;
                }

                currntEvent.EventName = dto.EventName;
                currntEvent.Description = dto.Description;
                currntEvent.Category = dto.Category;
                currntEvent.Date = dto.Date;
                currntEvent.Price = dto.Price;
                currntEvent.Venue = dto.Venue;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Event updated successfully", currntEvent });
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Database error: " + ex.Message);
                return StatusCode(500, "Something went wrong. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var currentEvent = await _context.Events
                    .Include(e => e.Bookings) 
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (currentEvent == null)
                {
                    return NotFound(new { message = "Event not found" });
                }

                
                _context.Bookings.RemoveRange(currentEvent.Bookings);

                
                if (!string.IsNullOrEmpty(currentEvent.Image) && !currentEvent.Image.Contains("default.png"))
                {
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", currentEvent.Image.TrimStart('/'));
                    if (System.IO.File.Exists(imagePath))
                    {
                        System.IO.File.Delete(imagePath);
                    }
                }

                _context.Events.Remove(currentEvent);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Event deleted successfully" });
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Database error: " + ex.Message);
                return StatusCode(500, "Something went wrong. Please try again later.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchEvents([FromQuery] string name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                    return BadRequest(new { message = "Search term is required." });

                var matchedEvents = await _context.Events
                    .Where(e => e.EventName.Contains(name))
                    .ToListAsync();

                if (matchedEvents == null || !matchedEvents.Any())
                    return NotFound(new { message = "No events found matching the search term." });

                return Ok(new { events = matchedEvents });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while searching.", error = ex.Message });
            }
        }

    }
}
