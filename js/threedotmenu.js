document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelector('.menu-links');
  
    if (menu && menuLinks) {
      menu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuLinks.classList.toggle('show');
      });
  
      document.addEventListener('click', () => {
        menuLinks.classList.remove('show');
      });
  
      menuLinks.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent menu from closing when clicking links
      });

      menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          menuLinks.classList.remove('show'); // close menu
          window.location.href = href; // navigate smoothly
        });
      });
    }
  });