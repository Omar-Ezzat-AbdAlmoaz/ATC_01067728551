using EventBookingSystem.Data;
using EventBookingSystem.DTOs;
using EventBookingSystem.Models;
using EventBookingSystem.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace EventBookingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthController(AppDbContext context,IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = new PasswordHasher<User>();

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            if (!Regex.IsMatch(dto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$")){
                return BadRequest("Invalid Email");
            }
            if (!Regex.IsMatch(dto.Password, @"^(?=.*[A-Z])(?=.*\d).{8,}$")){ 
                return BadRequest("Password must contain at least one uppercase letter and one number."); 
            }

            try
            {

                if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                {
                    return BadRequest("Email already in use.");
                }
            
                var user = new User
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    Role = Role.User
                };

                user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok("Registered successfully. You can now log in.");
            }
            catch (SqlException ex)
            {
                Console.WriteLine("Database error: " + ex.Message);
                return StatusCode(500, "Something went wrong. Please try again later.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unexpected error: " + ex.Message);
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
                if (user == null)
                {
                    return Unauthorized("Invalid Email");
                }

                var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
                if (result == PasswordVerificationResult.Failed)
                {
                    return Unauthorized("Invalid Password");
                }

           
                var token = _jwtService.GenerateToken(user, user.Role.ToString());

                return Ok(new { Token = token, role = user.Role.ToString(),email = user.Email});
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
    }
}
