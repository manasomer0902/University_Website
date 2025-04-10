document.addEventListener("DOMContentLoaded", () => {
    // Check login status
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "login.html";
    }
  
    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    });
  }
  
    // Fetch feedback from backend
    fetch('https://unifeedback.glitch.me/feedbacks')
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('feedbackContainer');
        if (!data || data.length === 0) {
            container.innerHTML = "<p>Error loading feedbacks. Please try again later.</p>"; 
        } else {
          data.forEach(item => {
            const div = document.createElement('div');
            div.className = "feedback-item";
            div.innerHTML = `<strong>${item.name}</strong><br>${item.feedback}`;
            container.appendChild(div);
          });
        }
      })
      .catch(err => {
        document.getElementById('feedbackContainer').innerHTML = "<p>Error loading feedbacks.</p>";
        console.error(err);
      });
    });
  