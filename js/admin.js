document.addEventListener("DOMContentLoaded", () => {
    // Check login status
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "login.html";
    }
  
    // Logout functionality
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");

      const menuLinks = document.querySelector(".menu-links");
      if (menuLinks) {
        menuLinks.classList.remove("show");
  }
      
      // Add a slight delay to allow UI updates to complete
      setTimeout(() => {
        window.location.href = "login.html";
      }, 100); // 100ms delay is enough to avoid the glitch
    });
  
  
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
  