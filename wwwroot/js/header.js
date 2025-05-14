document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); 

    let html = `
        <header class="header-nav">
            <p class="logo">Event Booking</p>
            <div class="nav-links">
    `;

    if (token) {
        html += `
            <span class="user-email">${email}</span>
            <a href="#" id="logout-btn">Logout</a>
        `;
    } else {
        html += `
            <a href="/pages/auth/login.html">Login</a>
            <a href="/pages/auth/register.html">Register</a>
        `;
    }

    html += `
            </div>
        </header>
    `;

    header.innerHTML = html;

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("email");
            window.location.href = "/pages/welcom-page.html";
        });
    }
});
