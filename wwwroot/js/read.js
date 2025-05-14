document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    if (!eventId) {
        alert("Invalid Event ID");
        return;
    }

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/Event/${eventId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            alert("Failed to load event details.");
            return;
        }

        const ev = await response.json();
        document.getElementById("eventName").textContent = ev.eventName;
        document.getElementById("description").textContent = ev.description || "-";
        document.getElementById("category").textContent = ev.category || "-";
        document.getElementById("date").textContent = new Date(ev.date).toLocaleString();
        document.getElementById("venue").textContent = ev.venue;
        document.getElementById("price").textContent = ev.price;
        document.getElementById("image").src = ev.image || "https://via.placeholder.com/200";

        document.getElementById("edit-btn").addEventListener("click", function () {
            window.location.href = `/pages/admin-panal/edit.html?id=${eventId}`;
        });

        document.getElementById("delete-btn").addEventListener("click", function () {
            window.location.href = `/pages/admin-panal/delete.html?id=${eventId}`;
        });

    } catch (error) {
        console.error("Error loading event:", error);
        alert("Something went wrong while loading the event.");
    }


    

});
