using Microsoft.EntityFrameworkCore;
using EventBookingSystem.Models;

namespace EventBookingSystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Id)
                      .ValueGeneratedOnAdd(); 

                entity.Property(u => u.FullName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.Email)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.HasIndex(u => u.Email)
                      .IsUnique();

                entity.Property(u => u.Role)
                      .HasConversion<string>();

                // Relationship: User -> Bookings (1:N)
                entity.HasMany(u => u.Bookings)
                      .WithOne(b => b.User)
                      .HasForeignKey(b => b.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasData(new User
                {
                    Id = 1,
                    FullName = "Super Admin",
                    Email = "admin@eventBooking.com",
                    PasswordHash= "AQAAAAIAAYagAAAAEOQEX5a419/uu4DmTfU4108Jk465x1fF4LmkWPWCg4tQlGMLxVQb5DH09JuuLCS5OA==",
                    Role = Role.Admin,
                });
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd();

                entity.Property(e => e.EventName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(e => e.Description)
                      .HasMaxLength(500);

                entity.Property(e => e.Category)
                      .HasMaxLength(50);

                entity.Property(e => e.Date)
                      .IsRequired();

                entity.Property(e => e.Venue)
                      .IsRequired()
                      .HasMaxLength(150);

                entity.Property(e => e.Price)
                      .IsRequired()
                      /*.HasCheckConstraint("CK_Event_Price_NonNegative", "[Price] >= 0")*/;

                entity.Property(e => e.Image)
                    .HasMaxLength(255);
                    

                // Relationship: Event -> Bookings (1:N)
                entity.HasMany(e => e.Bookings)
                      .WithOne(b => b.Event)
                      .HasForeignKey(b => b.EventId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(b => b.Id);
                entity.Property(b => b.Id)
                      .ValueGeneratedOnAdd();

                entity.Property(b => b.BookingDate)
                      .IsRequired();
            });
        }

    }
}
