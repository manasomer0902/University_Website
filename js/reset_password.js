document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resetForm");
  const messageEl = document.getElementById("message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = new URLSearchParams(window.location.search).get("email");

    if (!email) {
      messageEl.innerText = "Invalid or expired reset link.";
      messageEl.style.color = "red";
      return;
    }

    if (newPassword !== confirmPassword) {
      messageEl.innerText = "Passwords don't match.";
      messageEl.style.color = "red";
      return;
    }

    try {
      const res = await fetch("https://unifeedback.glitch.me/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();
      messageEl.innerText = data.message || data.error;
      messageEl.style.color = data.success ? "green" : "red";

      if (data.success) {
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      messageEl.innerText = "Something went wrong. Try again.";
      messageEl.style.color = "red";
    }
  });
});

// Toggle visibility function
function toggleVisibility(id, icon) {
  const field = document.getElementById(id);
  if (field.type === "password") {
    field.type = "text";
    icon.textContent = "🙈";
  } else {
    field.type = "password";
    icon.textContent = "👁️";
  }
}
