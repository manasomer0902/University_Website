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
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "admin.html";
        } else {
          document.getElementById("error").textContent = "Invalid username or password";
        }
      })
      .catch(err => {
        document.getElementById("error").textContent = "Login error. Please try again.";
        console.error(err);
      });
  });
  