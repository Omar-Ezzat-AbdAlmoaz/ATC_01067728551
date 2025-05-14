# Frontend 

This is the frontend part of the Event Booking System, built using **HTML**, **CSS**, and **JavaScript**. It communicates with the backend ASP.NET Core API using HTTP requests.

---

## 📁 Folder Structure

frontend/
│
├── CSS/
│   ├── style.css            # General styles
│   └── home.css             # Styles for home and event cards
│
├── JS/
│   ├── admin-auth.js        # Admin authentication check
│   ├── create.js            # Handle event creation
│   ├── delete.js            # Handle event deletion
│   ├── details.js           # Show event details
│   ├── edit.js              # Handle event editing
│   ├── header.js            # Common header rendering
│   ├── home.js              # Logic for home page
│   ├── login.js             # Handle user login
│   ├── register.js          # Handle user registration
│   ├── read.js              # Admin read events logic
│   ├── user-auth.js         # User authentication check
│   └── view.js              # Admin Handle events 
│
├── pages/
│   ├── welcom-page.html     # Landing page with login/register options
│   ├── cong.html            # Congratulation page after booking
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── home/
│   │   ├── home-page.html  # View all events (user) 
│   │   └── details-event.html
│   └── admin-panal/
│       ├── create.html
│       ├── delete.html
│       ├── edit.html
│       ├── read.html
│       └── view.html      # View/manage events (admin)  
## 🚀 How to Run Frontend

### 🧱 Option 1: Using Live Server (Recommended)
1. Install the VS Code extension **Live Server**
2. Open the `frontend` folder in VS Code
3. Right-click on `welcome.html` or `login.html` → **Open with Live Server**

### 🌐 Option 2: Manual Open
1. Open `welcome.html` or `login.html` in your browser directly.
2. Make sure the backend API is running at `http://localhost:5000` or change the API URL in your JavaScript accordingly.

## 🔑 Authentication

- JWT token is stored in `localStorage`
- The token is included in API requests via the `Authorization: Bearer <token>` header

