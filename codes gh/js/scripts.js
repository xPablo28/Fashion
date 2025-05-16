// Toggle Navigation Menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Scroll Reveal Animations
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 500 });
ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 1000 });
ScrollReveal().reveal(".header__content form", { ...scrollRevealOption, delay: 1500 });
ScrollReveal().reveal(".header__content .bar", { ...scrollRevealOption, delay: 2000 });
ScrollReveal().reveal(".header__image__card", { duration: 1000, interval: 500, delay: 2500 });

// Smooth Scroll to Sections
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form Validation for Contact Section
const contactForm = document.querySelector(".contact__form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("input[name='name']");
    const email = contactForm.querySelector("input[name='email']");
    const message = contactForm.querySelector("textarea[name='message']");

    if (!name.value || !email.value || !message.value) {
      alert("Please fill in all fields.");
      return;
    }

    alert("Form submitted successfully!");
    contactForm.reset();
  });
}

// Package Section Interactivity
document.addEventListener("DOMContentLoaded", () => {
  const packages = document.querySelectorAll("#package .package");

  packages.forEach((packageCard) => {
    // Highlight clicked package
    packageCard.addEventListener("click", () => {
      packages.forEach(card => card.classList.remove("active"));
      packageCard.classList.add("active");

      const packageTitle = packageCard.querySelector(".package_title").textContent;
      alert(`You selected the ${packageTitle}!`);
    });

    // Add hover effects
    packageCard.addEventListener("mouseover", () => {
      packageCard.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)";
    });

    packageCard.addEventListener("mouseout", () => {
      packageCard.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    });
  });

  // Smooth scroll to the package section if URL contains #package
  const packageSection = document.getElementById("package");
  if (window.location.hash === "#package") {
    packageSection.scrollIntoView({ behavior: "smooth" });
  }
});
