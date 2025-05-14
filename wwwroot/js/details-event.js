document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");

    if (!eventId) {
        alert("Invalid Event ID");
        return;
    }

    try {
        const token = localStorage.getItem("token");

        const [eventRes, bookingsRes] = await Promise.all([
            fetch(`/api/Event/${eventId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }),
            fetch(`/api/booking`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
        ]);

        if (!eventRes.ok || !bookingsRes.ok) {
            alert("Failed to load data.");
            return;
        }

        const ev = await eventRes.json();
        const bookings = await bookingsRes.json();

        document.getElementById("eventName").textContent = ev.eventName;
        document.getElementById("description").textContent = ev.description || "-";
        document.getElementById("category").textContent = ev.category || "-";
        document.getElementById("date").textContent = new Date(ev.date).toLocaleString();
        document.getElementById("venue").textContent = ev.venue;
        document.getElementById("price").textContent = ev.price;
        document.getElementById("image").src = ev.image || "https://via.placeholder.com/200";

        const isBooked = bookings.bookings.some(b => b.eventId === ev.id);

        if (isBooked) {
            document.getElementById("bookedLabel").style.display = "inline-block";

            const bookingRes = await fetch(`/api/booking`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const bookingData = await bookingRes.json();
            const myBooking = bookingData.bookings.find(b => b.eventId === ev.id);

            if (myBooking) {
                document.getElementById("ticketCount").textContent = myBooking.ticketCount;
                document.getElementById("ticketCountLabel").style.display = "inline-block";
            }
        }
        
        
        const bookBtn = document.getElementById("bookButton");
        bookBtn.style.display = "inline-block";
        bookBtn.addEventListener("click", async () => {
            const res = await fetch(`/api/booking/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ eventId: ev.id })
            });

            const result = await res.json();
            if (result.book) {
                window.location.href = "/pages/cong.html";
            } else {
                alert(result.message || "Booking failed");
            }
        });
    } catch (error) {
        console.error("Error loading event:", error);
        alert("Something went wrong while loading the event.");
    }
});
