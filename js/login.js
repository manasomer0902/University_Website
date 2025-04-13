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


// login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    fetch("https://unifeedback.glitch.me/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("username", username);
          localStorage.setItem("isLoggedIn", "true");

          window.location.href = "admin.html";
        } else {
          document.getElementById("error").textContent = "Invalid username or password";
        }
      })
      .catch(err => {
        document.getElementById("feedbackContainer").innerHTML =
          `<p>Error loading feedbacks: ${err.message}</p>`;
        console.error(err);
      });
  });

  
 