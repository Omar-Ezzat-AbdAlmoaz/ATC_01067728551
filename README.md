A README file for each frontend and backend with clear setup instructions
# Frontend 

This is the frontend part of the Event Booking System, built using **HTML**, **CSS**, and **JavaScript**.
It communicates with the backend ASP.NET Core API using HTTP requests.

---

## 📁 Folder Structure

frontend/
│
├── CSS/
│   ├── style.css           # General styles (buttons, layout, fonts)
│   └── home.css            # Home & event card specific styling
│
├── JS/
│   ├── admin-auth.js       # Check and restrict access to admin pages
│   ├── create.js           # Logic for creating new events
│   ├── delete.js           # Delete event logic
│   ├── details.js          # Show event details to user
│   ├── edit.js             # Update/edit event logic
│   ├── header.js           # Render common headers (admin/user)
│   ├── home.js             # Show list of events for user
│   ├── login.js            # Handle user login form
│   ├── register.js         # Handle user registration form
│   ├── read.js             # Admin view of all events
│   ├── user-auth.js        # Check and restrict access to user pages
│   └── view.js             # Admin panel - event view management
│
├── pages/
│   ├── welcom-page.html         # Landing page (login/register links)
│   ├── cong.html                # Congratulations page after booking
│
│   ├── auth/
│   │   ├── login.html           # Login form
│   │   └── register.html        # Registration form
│
│   ├── home/
│   │   ├── home-page.html       # Main page for users showing events
│   │   └── details-event.html   # Detailed view of a single event
│
│   └── admin-panal/
│       ├── create.html          # Create new event
│       ├── delete.html          # Delete confirmation
│       ├── edit.html            # Edit existing event
│       ├── read.html            # Read/view event info
│       └── view.html            # Admin event control panel

## 🚀 How to Run Frontend

### 🧱 Option 1: Using Live Server (Recommended)
1. Install the VS Code extension **Live Server**
2. Open the `frontend` folder in VS Code
3. Right-click on `welcome.html` or `login.html` → **Open with Live Server**

### 🌐 Option 2: Manual Open
1. Open `welcome.html` or `login.html` in your browser directly.
2. Make sure the backend API is running at `http://localhost:5000` or change the API URL in your JavaScript accordingly.

# Backend 
This is the backend API for the Event Booking System, built using ASP.NET Core (.NET 8). 
It handles user registration, login, JWT-based authentication, event management, and booking logic.

📦 Technologies Used
ASP.NET Core Web API (.NET 8)

Entity Framework Core

SQL Server

JWT Authentication

RESTful APIs

🛠️ Installation & Setup
1. 📥 Clone the repo
- git clone <repo-url>
- cd backend
2. 🧱 Install Required Packages
Make sure you're inside the backend project folder, then run:

dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
3. ⚙️ Configure the appsettings.json

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=EventDb;Trusted_Connection=True;TrustServerCertificate=True;"
},
"Jwt": {
  "Key": "YourSecretKeyHere",
  "Issuer": "YourApp",
  "Audience": "YourUsers",
  "DurationInMinutes": 60
}
Replace "YourSecretKeyHere" with a strong key.

Make sure your SQL Server is running.

4. 🔧 Update Program.cs
Ensure the following is added:


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(...);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
5. 📚 Run Migrations

dotnet ef migrations add InitialCreate
dotnet ef database update
This will create your database with the defined schema.

📁 Models Overview
🧑‍ User
📅 Event
📖 Booking

🔐 JWT Authorization
Users receive a JWT Token upon successful login.

The token includes Id, Email, and Role.

It is required in the Authorization header as Bearer <token> for all protected endpoints.

🔗 API Endpoints
🔑 Authentication
Method	Endpoint	Access	Description
POST	/api/auth/register	Public	Register new user
POST	/api/auth/login	Public	Login and receive token

📅 Events
Method	Endpoint	Access	Description
GET	/api/event	Auth	List all events
GET	/api/event/search?name=...	Auth	Search events by name
GET	/api/event/{id}	Auth	Get details of an event
POST /api/event/create	Admin	Create a new event
PUT	/api/event/{id}	Admin	Update an event
DELETE	/api/event/{id}	Admin	Delete an event

📖 Bookings
Method	Endpoint	Access	Description
GET	/api/booking	User	Get current user's bookings
POST	/api/booking/create	User	Book an event

✅ Roles
Admin: Has full access to event management.

User: Can register, login, book events, and view own bookings.

🚀 Run the Server
dotnet run
Then open your browser or use tools like Postman to hit:

https://localhost:5001/api/...
📌 Notes
The admin user must be seeded manually or added directly in the DB with Role = Admin.

Passwords are hashed using a secure algorithm.

Make sure the frontend uses the JWT token from login to access protected APIs.

## 🔑 Authentication

- JWT token is stored in `localStorage`
- The token is included in API requests via the `Authorization: Bearer <token>` header


🚀 System Usage Scenario
Here’s a walkthrough of what happens when someone starts using the system:

🏁 Step 1: Open the Application
The user opens the frontend by launching:
/pages/welcom-page.html
They land on the Welcome Page which provides two options:

🔐 Login

📝 Register

👤 Step 2: Authentication
Option A - New User:
Clicks Register

Fills in:

Full name

Email

Password

On successful registration:

User is redirected to the Login Page

Option B - Existing User:
Clicks Login

Enters email and password

🔁 Step 3: Role-Based Redirection
After login, the system checks the user’s role from the JWT token:

✅ If User (normal):
Redirected to:

/pages/home/home-page.html
Can:

View list of available events

Searsh in event by name

Click any event for more details

Book an event (if available)

On successful booking → redirected to:

/pages/cong.html
🛠️ If Admin:
Redirected to:

/pages/admin-panal/view.html
Admin Panel Options:

Create a new event → create.html

Edit existing events → edit.html

Delete events → delete.html

View and read all event details → view.html, read.html

🔐 Authorization Logic
All admin pages are protected using admin-auth.js

All user pages are protected using user-auth.js

Unauthorized access will redirect to the welcome page

🔓 Logout
At any time, the user/admin can log out

This clears the token and returns them to the Welcome Page

