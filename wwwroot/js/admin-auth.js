(function () {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "Admin") {
        alert("Access denied. Admins only.");
        window.location.href = "/pages/auth/login.html";
    }
})();
