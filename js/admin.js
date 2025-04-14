// Check login status function
function checkLoginStatus() {
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if (!token || !isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// Handle logout function
function handleLogout() {
  const username = localStorage.getItem("username");
  
  fetch("https://unifeedback.glitch.me/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  })
  .then(() => {
    // Clear all login info
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");

    const menuLinks = document.querySelector(".menu-links");
    if (menuLinks) menuLinks.classList.remove("show");

    window.location.href = "login.html";
  })
  .catch(err => {
    console.error("Logout error:", err);
    // Force logout even if server request fails
    localStorage.clear();
    window.location.href = "login.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!checkLoginStatus()) return;

  // Setup logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // 🔐 Fetch feedback with token and username

  const token = localStorage.getItem("token");
  console.log("Token being sent:", token); // 🪵 check if it's valid

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch("https://unifeedback.glitch.me/feedbacks", {
    headers: {
      Authorization: token

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
