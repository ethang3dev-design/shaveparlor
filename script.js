// ---------------- MOBILE MENU TOGGLE ----------------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("open");
  });

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

  // Close menu when clicking links
  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

  // ---------------- SCROLL REVEAL ----------------
  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("inview");
      }
    }
  });

 
});
