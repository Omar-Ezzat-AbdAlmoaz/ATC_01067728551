document.getElementById("create-event-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    document.querySelectorAll(".error").forEach(span => span.textContent = "");

    const form = e.target;
    const formData = new FormData(form);

    const token = localStorage.getItem("token"); 
    const response = await fetch("/api/Event/create", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        if (response.status === 400) {
            const errorData = await response.json();
            if (errorData.errors) {
                for (let key in errorData.errors) {
                    const errorSpan = document.querySelector(`.error[data-error-for="${key.charAt(0).toLowerCase() + key.slice(1)}"]`);
                    if (errorSpan) {
                        errorSpan.textContent = errorData.errors[key][0];
                    }
                }
            }
        } else if (response.status === 401 || response.status === 403) {
            alert("Unauthorized. Please login as admin.");
        } else {
            alert("An unexpected error occurred.");
        }
    } else {
        alert("Event created successfully!");
        form.reset();
        window.location.href = "/pages/admin-panal/view.html";
    }
});
