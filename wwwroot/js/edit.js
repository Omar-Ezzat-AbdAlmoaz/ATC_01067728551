document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    if (!eventId) return alert("Missing event ID");

    document.getElementById("eventId").value = eventId;

    
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/Event/${eventId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) return alert("Failed to fetch event details");
    const event = await res.json();

    const form = document.getElementById("edit-event-form");
    form.eventName.value = event.eventName;
    form.description.value = event.description || "";
    form.category.value = event.category || "";
    form.date.value = new Date(event.date).toISOString().slice(0, 16); // format yyyy-MM-ddTHH:mm
    form.venue.value = event.venue;
    form.price.value = event.price;
    document.getElementById("current-image").src = event.image || "https://via.placeholder.com/200";
});

document.getElementById("edit-event-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const eventId = document.getElementById("eventId").value;
    const token = localStorage.getItem("token");

    
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    const formData = new FormData(form);

    const res = await fetch(`/api/Event/${eventId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (!res.ok) {
        if (res.status === 400) {
            const errData = await res.json();
            if (errData.errors) {
                for (let key in errData.errors) {
                    const span = document.querySelector(`.error[data-error-for="${key.charAt(0).toLowerCase() + key.slice(1)}"]`);
                    if (span) span.textContent = errData.errors[key][0];
                }
            }
        } else {
            alert("Something went wrong.");
        }
    } else {
        alert("Event updated successfully!");
        window.location.href = "/pages/admin-panal/view.html";
    }
});
