function toggleVisibility(id, icon) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}

document.getElementById("resetForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");
  const email = new URLSearchParams(window.location.search).get("email");

  if (!email) {
    message.innerText = "Invalid or expired reset link.";
    message.style.color = "red";
    return;
  }

  if (newPassword !== confirmPassword) {
    message.innerText = "Passwords don't match.";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch("https://unifeedback.glitch.me/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await res.json();
    message.innerText = data.message || "Something went wrong.";
    message.style.color = data.message === "Password updated successfully." ? "green" : "red";

    if (data.message === "Password updated successfully.") {
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }

  } catch (err) {
    console.error(err);
    message.innerText = "Something went wrong.";
    message.style.color = "red";
  }
});
