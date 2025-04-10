document.getElementById("resetForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const newPassword = document.getElementById("newPassword").value;

    if (!email) {
        document.getElementById("message").innerText = "Invalid or expired reset link.";
        return;
      }
    
      try {
    const res = await fetch("https://unifeedback.glitch.me/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword })
    });
  
    const data = await res.json();
    document.getElementById("message").innerText = data.message || data.error;
    if (data.success) {
        document.getElementById("message").style.color = "green";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        document.getElementById("message").style.color = "red";
      }
    } catch (error) {
      console.error(error);
      document.getElementById("message").innerText = "Something went wrong. Try again.";
      document.getElementById("message").style.color = "red";
    }
  });
  