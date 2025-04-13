document.addEventListener("DOMContentLoaded", () => {
  // Redirect to login if not logged in
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const username = localStorage.getItem("username");

      // 🔐 Call logout endpoint
      fetch("https://unifeedback.glitch.me/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      })
        .then(() => {
          // Clear all login info
          localStorage.removeItem("authToken");
          localStorage.removeItem("username");
          localStorage.removeItem("isLoggedIn");

          const menuLinks = document.querySelector(".menu-links");
          if (menuLinks) menuLinks.classList.remove("show");

          setTimeout(() => {
            window.location.href = "login.html";
          }, 100);
        });
    });
  }

  // 🔐 Fetch feedback with token and username
  fetch("https://unifeedback.glitch.me/feedbacks", {
    headers: {
      "username": localStorage.getItem("username"),
      "token": localStorage.getItem("authToken")
    }
  })
    .then(res => {
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => {
      const container = document.getElementById("feedbackContainer");
      if (!data || data.length === 0) {
        container.innerHTML = "<p>No feedback available.</p>";
      } else {
        data.forEach(item => {
          const div = document.createElement("div");
          div.className = "feedback-item";
          div.innerHTML = `<strong>${item.name}</strong><br>${item.feedback}`;
          container.appendChild(div);
        });
      }
    })
    .catch(err => {
      document.getElementById("feedbackContainer").innerHTML = "<p>Error loading feedbacks.</p>";
      console.error(err);
    });
});
