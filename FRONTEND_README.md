Frontend
This is the frontend part of the Event Booking System, built using HTML, CSS, and JavaScript. It communicates with the backend ASP.NET Core API using HTTP requests.

📁 Folder Structure
frontend/ │ ├── CSS/ │ ├── style.css # General styles (buttons, layout, fonts) │ └── home.css # Home & event card specific styling │ ├── JS/ │ ├── admin-auth.js # Check and restrict access to admin pages │ ├── create.js # Logic for creating new events │ ├── delete.js # Delete event logic │ ├── details.js # Show event details to user │ ├── edit.js # Update/edit event logic │ ├── header.js # Render common headers (admin/user) │ ├── home.js # Show list of events for user │ ├── login.js # Handle user login form │ ├── register.js # Handle user registration form │ ├── read.js # Admin view of all events │ ├── user-auth.js # Check and restrict access to user pages │ └── view.js # Admin panel - event view management │ ├── pages/ │ ├── welcom-page.html # Landing page (login/register links) │ ├── cong.html # Congratulations page after booking │ │ ├── auth/ │ │ ├── login.html # Login form │ │ └── register.html # Registration form │ │ ├── home/ │ │ ├── home-page.html # Main page for users showing events │ │ └── details-event.html # Detailed view of a single event │ │ └── admin-panal/ │ ├── create.html # Create new event │ ├── delete.html # Delete confirmation │ ├── edit.html # Edit existing event │ ├── read.html # Read/view event info │ └── view.html # Admin event control panel

🚀 How to Run Frontend
🧱 Option 1: Using Live Server (Recommended)
Install the VS Code extension Live Server
Open the frontend folder in VS Code
Right-click on welcome.html or login.html → Open with Live Server
🌐 Option 2: Manual Open
Open welcome.html or login.html in your browser directly.
Make sure the backend API is running at http://localhost:5000 or change the API URL in your JavaScript accordingly.
