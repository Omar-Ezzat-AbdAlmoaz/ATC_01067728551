(function () {
    console.log("Running user auth guard...");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "User") {
        alert("Plase login.");
        window.location.href = "/pages/auth/login.html";
    }
})();
