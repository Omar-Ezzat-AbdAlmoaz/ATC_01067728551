Backend
This is the backend API for the Event Booking System, built using ASP.NET Core (.NET 8). It handles user registration, login, JWT-based authentication, event management, and booking logic.

📦 Technologies Used ASP.NET Core Web API (.NET 8)

Entity Framework Core

SQL Server

JWT Authentication

RESTful APIs

🛠️ Installation & Setup

📥 Clone the repo
git clone
cd backend
🧱 Install Required Packages Make sure you're inside the backend project folder, then run:
dotnet add package Microsoft.EntityFrameworkCore dotnet add package Microsoft.EntityFrameworkCore.SqlServer dotnet add package Microsoft.EntityFrameworkCore.Tools dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer 3. ⚙️ Configure the appsettings.json

"ConnectionStrings": { "DefaultConnection": "Server=localhost;Database=EventDb;Trusted_Connection=True;TrustServerCertificate=True;" }, "Jwt": { "Key": "YourSecretKeyHere", "Issuer": "YourApp", "Audience": "YourUsers", "DurationInMinutes": 60 } Replace "YourSecretKeyHere" with a strong key.

Make sure your SQL Server is running.

🔧 Update Program.cs Ensure the following is added:
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) .AddJwtBearer(...); builder.Services.AddDbContext(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); 5. 📚 Run Migrations

dotnet ef migrations add InitialCreate dotnet ef database update This will create your database with the defined schema.

📁 Models Overview 🧑‍ User 📅 Event 📖 Booking

🔐 JWT Authorization Users receive a JWT Token upon successful login.

The token includes Id, Email, and Role.

It is required in the Authorization header as Bearer for all protected endpoints.

🔗 API Endpoints 🔑 Authentication Method Endpoint Access Description POST /api/auth/register Public Register new user POST /api/auth/login Public Login and receive token

📅 Events Method Endpoint Access Description GET /api/event Auth List all events GET /api/event/search?name=... Auth Search events by name GET /api/event/{id} Auth Get details of an event POST /api/event/create Admin Create a new event PUT /api/event/{id} Admin Update an event DELETE /api/event/{id} Admin Delete an event

📖 Bookings Method Endpoint Access Description GET /api/booking User Get current user's bookings POST /api/booking/create User Book an event

✅ Roles Admin: Has full access to event management.

User: Can register, login, book events, and view own bookings.

🚀 Run the Server dotnet run Then open your browser or use tools like Postman to hit:

https://localhost:5001/api/... 📌 Notes The admin user must be seeded manually or added directly in the DB with Role = Admin.

Passwords are hashed using a secure algorithm.

Make sure the frontend uses the JWT token from login to access protected APIs.

🔑 Authentication
JWT token is stored in localStorage
The token is included in API requests via the Authorization: Bearer <token> header
🚀 System Usage Scenario Here’s a walkthrough of what happens when someone starts using the system:

🏁 Step 1: Open the Application The user opens the frontend by launching: /pages/welcom-page.html They land on the Welcome Page which provides two options:

🔐 Login

📝 Register

👤 Step 2: Authentication Option A - New User: Clicks Register

Fills in:

Full name

Email

Password

On successful registration:

User is redirected to the Login Page

Option B - Existing User: Clicks Login

Enters email and password

🔁 Step 3: Role-Based Redirection After login, the system checks the user’s role from the JWT token:

✅ If User (normal): Redirected to:

/pages/home/home-page.html Can:

View list of available events

Searsh in event by name

Click any event for more details

Book an event (if available)

On successful booking → redirected to:

/pages/cong.html 🛠️ If Admin: Redirected to:

/pages/admin-panal/view.html Admin Panel Options:

Create a new event → create.html

Edit existing events → edit.html

Delete events → delete.html

View and read all event details → view.html, read.html

🔐 Authorization Logic All admin pages are protected using admin-auth.js

All user pages are protected using user-auth.js

Unauthorized access will redirect to the welcome page

🔓 Logout At any time, the user/admin can log out

This clears the token and returns them to the Welcome Page
