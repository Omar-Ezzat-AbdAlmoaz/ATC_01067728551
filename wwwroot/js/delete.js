document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    if (!eventId) return alert("Missing event ID");

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/Event/${eventId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) return alert("Failed to fetch event details");

    const event = await res.json();

    document.getElementById("event-name").textContent = event.eventName;
    document.getElementById("event-date").textContent = new Date(event.date).toLocaleString();
    document.getElementById("event-venue").textContent = event.venue;
    document.getElementById("event-image").src = event.image;

    document.getElementById("delete-btn").addEventListener("click", async function () {
        if (!confirm("Are you sure you want to delete this event?")) return;

        const deleteRes = await fetch(`/api/Event/${eventId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!deleteRes.ok) {
            alert("Failed to delete event.");
        } else {
            alert("Event deleted successfully!");
            window.location.href = "/pages/admin-panal/view.html";
        }
    });
    document.getElementById("cancel-btn").addEventListener("click", function () {
        window.location.href = "/pages/admin-panal/view.html";
    });

});
