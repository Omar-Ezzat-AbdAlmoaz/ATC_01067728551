document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const errorDiv = document.getElementById("error");
    const successDiv = document.getElementById("success");
    errorDiv.textContent = "";
    successDiv.textContent = "";

    // Simple client-side validation
    if (fullName === "" || email === "" || password === "") {
        errorDiv.textContent = "All fields are required.";
        return;
    }
    if (password.length < 8) {
        errorDiv.textContent = "Password must be at least 8 characters.";
        return;
    }
    if (!password.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)) {
        errorDiv.textContent = "Password must contain at least one uppercase letter and one number.";
        return;
    }
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        errorDiv.textContent = "Invalid email format.";
        return;
    }

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.text();
        
        if (response.ok) {
            successDiv.textContent = "Registered successfully. Redirecting to login...";
            setTimeout(() => {
                window.location.href = "/pages/auth/login.html";
            }, 1000);
        } else {
            errorDiv.textContent = data;
        }
    } catch (error) {
        errorDiv.textContent = "Something went wrong. Please try again.";
    }
});
