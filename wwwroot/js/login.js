document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    const payload = { email, password };

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("email", data.email);
            alert("Login successful!");

            
            if (data.role === "Admin") {
                window.location.href = "/pages/admin-panal/view.html";
            } else if (data.role === "User") {
                window.location.href = "/pages/home/home-page.html";
            }

        } else {
            errorMessage.textContent = data || "Login failed";
        }

    } catch (error) {
        errorMessage.textContent = "Error connecting to server.";
        console.error(error);
    }
});
