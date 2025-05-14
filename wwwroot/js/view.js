

document.addEventListener("DOMContentLoaded", () => {
    fetchEvents();
});

function fetchEvents() {
    fetch("/api/event", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch events");
            return res.json();
        })
        .then(data => {
            const container = document.getElementById("eventsContainer");
            container.innerHTML = ""; 
            
            data.events.forEach(ev => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${ev.eventName}</td>
                <td>${new Date(ev.date).toLocaleDateString()}</td>
                <td>
                    <a href="/pages/admin-panal/read.html?id=${ev.id}">
                        <button class="action-btn view-btn">View</button>
                    </a>
                    <a href="/pages/admin-panal/edit.html?id=${ev.id}">
                        <button class="action-btn edit-btn">Edit</button>
                    </a>
                    <a href="/pages/admin-panal/delete.html?id=${ev.id}">
                        <button class="action-btn edit-btn">Delete</button>
                    </a>
                </td>
            `;

                container.appendChild(row);
            });
            /*renderPagination(10, 1);*/

        })
        .catch(err => {
            alert("Error loading events: " + err.message);
        });
}

function searchEvents() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    const token = localStorage.getItem("token");

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    fetch(`/api/event/search?name=${encodeURIComponent(searchTerm)}`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(res => {
            if (res.status === 404) {
                throw new Error("No events found.");
            }
            if (!res.ok) {
                throw new Error("Search failed.");
            }
            return res.json();
        })
        .then(data => {
            const container = document.getElementById("eventsContainer");
            container.innerHTML = "";

            data.events.forEach(ev => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${ev.eventName}</td>
                <td>${new Date(ev.date).toLocaleDateString()}</td>
                <td>
                    <a href="/pages/admin-panal/read.html?id=${ev.id}">
                        <button class="action-btn view-btn">View</button>
                    </a>
                    <a href="/pages/admin-panal/edit.html?id=${ev.id}">
                        <button class="action-btn edit-btn">Edit</button>
                    </a>
                    <a href="/pages/admin-panal/delete.html?id=${ev.id}">
                        <button class="action-btn edit-btn">Delete</button>
                    </a>
                </td>
            `;
                container.appendChild(row);
            });
            /*renderPagination(10, 1);*/
        })
        .catch(err => {
            const container = document.getElementById("eventsContainer");
            container.innerHTML = `<p style="color: red;">${err.message}</p>`;
        });
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