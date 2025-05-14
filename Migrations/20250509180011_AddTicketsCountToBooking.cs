using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventBookingSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddTicketsCountToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "tickets",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "tickets",
                table: "Bookings");
        }
    }
}
