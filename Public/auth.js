document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "admin.html";
      } else {
        errorDiv.textContent = data.message || "Login failed.";
        errorDiv.style.display = "block";
      }
    } catch (err) {
      errorDiv.textContent = "Something went wrong.";
      errorDiv.style.display = "block";
    }
  });
});
