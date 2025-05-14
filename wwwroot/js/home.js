document.addEventListener('DOMContentLoaded', async () => {
    
    try {
        const token = localStorage.getItem("token");

        const eventsResponse = await fetch('/api/event', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const eventsData = await eventsResponse.json();
        const events = eventsData.events;

        
        const bookingsResponse = await fetch('/api/booking', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const bookingsData = await bookingsResponse.json();
        const bookings = bookingsData.bookings;

        const container = document.getElementById('events-container');
        container.innerHTML = '';

        events.forEach(event => {
            const isBooked = bookings.some(booking => booking.eventId === event.id);

            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            const bookSection = isBooked
                ? `<span class="booked-label">Booked</span>`
                : `<button class="book-button" data-event-id="${event.id}">Book Now</button>`;

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.eventName}" class="event-img">
                <h3 class="event-name">
                    <a href="/pages/home/details-event.html?id=${event.id}" class="event-link">
                        ${event.eventName}
                    </a>
                </h3>
                <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
                ${bookSection}
            `;

            if (!isBooked) {
                const bookButton = eventCard.querySelector('.book-button');
                bookButton.addEventListener('click', async () => {
                    const bookingResponse = await fetch('/api/booking/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ eventId: event.id }),
                    });

                    const bookingResult = await bookingResponse.json();
                    if (bookingResult.book) {
                        window.location.href = '/pages/cong.html';
                    } else {
                        alert(bookingResult.message || "Something went wrong.");
                    }
                });
            }

            container.appendChild(eventCard);
        });
        //renderPagination(10, 1);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load events or bookings.');
    }
});


async function searchEvents() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    const token = localStorage.getItem("token");

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    try {
        const eventsResponse = await fetch(`/api/event/search?name=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!eventsResponse.ok) {
            if (eventsResponse.status === 404) {
                throw new Error("No events found.");
            } else {
                throw new Error("Failed to fetch events.");
            }
        }

        const eventsData = await eventsResponse.json();
        const events = eventsData.events;

        const bookingsResponse = await fetch('/api/booking', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const bookingsData = await bookingsResponse.json();
        const bookings = bookingsData.bookings;

        const container = document.getElementById('events-container');
        container.innerHTML = '';

        events.forEach(event => {
            const isBooked = bookings.some(booking => booking.eventId === event.id);

            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            const bookSection = isBooked
                ? `<span class="booked-label">Booked</span>`
                : `<button class="book-button" data-event-id="${event.id}">Book Now</button>`;

            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.eventName}" class="event-img">
                <h3 class="event-name">
                    <a href="/pages/home/details-event.html?id=${event.id}" class="event-link">
                        ${event.eventName}
                    </a>
                </h3>
                <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
                ${bookSection}
            `;

            if (!isBooked) {
                const bookButton = eventCard.querySelector('.book-button');
                bookButton.addEventListener('click', async () => {
                    const bookingResponse = await fetch('/api/booking/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ eventId: event.id }),
                    });

                    const bookingResult = await bookingResponse.json();
                    if (bookingResult.book) {
                        window.location.href = '/pages/cong.html';
                    } else {
                        alert(bookingResult.message || "Something went wrong.");
                    }
                });
            }

            container.appendChild(eventCard);
        });
        //renderPagination(10, 1);
    } catch (err) {
        const container = document.getElementById('events-container');
        container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

//function renderPagination(totalPages, currentPage) {
//    const paginationContainer = document.getElementById("pagination");
//    paginationContainer.innerHTML = "";

//    for (let i = 1; i <= totalPages; i++) {
//        const btn = document.createElement("button");
//        btn.textContent = i;
//        if (i === currentPage) btn.classList.add("active-page");
//        btn.onclick = () => {
//            fetchEvents(i);
//        };
//        paginationContainer.appendChild(btn);
//    }
//}

