document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", function (event) {
      if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(10, 10, 10, 0.98)";
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.35)";
      } else {
        navbar.style.background = "#0a0a0a";
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
      }
    });
  }

  const welcomeBtn = document.getElementById("welcomeBtn");
  const welcomeMessage = document.getElementById("welcomeMessage");

  if (welcomeBtn && welcomeMessage) {
    welcomeBtn.addEventListener("click", function () {
      welcomeMessage.textContent =
        "Welcome to campus life! Explore events, resources, dining, wellness, and student opportunities all in one place.";
      welcomeMessage.style.display = "block";
    });
  }

  const quoteBtn = document.getElementById("quoteBtn");
  const quoteText = document.getElementById("quoteText");

  const quotes = [
    "Your college experience is built one choice, one connection, and one opportunity at a time.",
    "Show up, get involved, and make campus feel like home.",
    "Small steps every day can turn into a strong semester.",
    "College is not just about classes. It is about growth, community, and purpose."
  ];

  if (quoteBtn && quoteText) {
    quoteBtn.addEventListener("click", function () {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteText.textContent = quotes[randomIndex];
    });
  }

  const menuTabs = document.querySelectorAll(".menu-tab");
  const menuDays = document.querySelectorAll(".menu-day");

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const day = tab.dataset.day;

      menuTabs.forEach((item) => item.classList.remove("active"));
      menuDays.forEach((item) => item.classList.remove("active"));

      tab.classList.add("active");

      const activeDay = document.getElementById(day);
      if (activeDay) {
        activeDay.classList.add("active");
      }
    });
  });

  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodMessage = document.getElementById("moodMessage");

  moodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const mood = button.dataset.mood;

      if (!moodMessage) return;

      if (mood === "productive") {
        moodMessage.textContent =
          "Great! Visit the library, check your planner, and knock out your top priority first.";
      } else if (mood === "calm") {
        moodMessage.textContent =
          "Keep that balance. Take a walk, grab a meal, and enjoy a steady pace today.";
      } else if (mood === "stressed") {
        moodMessage.textContent =
          "Pause and breathe. Consider visiting wellness support, talking to a friend, or taking a short reset break.";
      }
    });
  });

  const registerButtons = document.querySelectorAll(".register-btn");

  registerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const eventName = button.dataset.event;
      const message = button.nextElementSibling;

      if (message) {
        message.textContent = `You are registered for ${eventName}.`;
        message.style.display = "block";
        message.style.color = "#66bb6a";
        message.style.fontWeight = "700";

        button.textContent = "Registered";
        button.disabled = true;
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target && navbar) {
        event.preventDefault();

        const navHeight = navbar.offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  const animatedElements = document.querySelectorAll(
    ".campus-card, .feature-item, .event-card, .upcoming-card, .resource-card, .contact-card, .stat-item, .app-card, .feature-card"
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  const statNumbers = document.querySelectorAll(".stat-number");

  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    statObserver.observe(stat);
  });

  function animateCounter(element) {
    const originalText = element.textContent;
    const hasPlus = originalText.includes("+");
    const hasPercent = originalText.includes("%");
    const number = parseInt(originalText.replace(/[^0-9]/g, ""));

    if (isNaN(number)) return;

    let current = 0;
    const steps = 50;
    const increment = number / steps;

    const timer = setInterval(function () {
      current += increment;

      if (current >= number) {
        current = number;
        clearInterval(timer);
      }

      let displayText = Math.floor(current).toLocaleString();

      if (hasPlus) displayText += "+";
      if (hasPercent) displayText += "%";

      element.textContent = displayText;
    }, 30);
  }

  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector(".btn");
    const newsletterInput = newsletterForm.querySelector(".newsletter-input");

    if (newsletterBtn && newsletterInput) {
      newsletterBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const email = newsletterInput.value.trim();

        if (isValidEmail(email)) {
          newsletterBtn.textContent = "Subscribed!";
          newsletterBtn.style.background = "#2e7d32";
          newsletterInput.value = "";

          setTimeout(function () {
            newsletterBtn.textContent = "Subscribe";
            newsletterBtn.style.background = "";
          }, 3000);
        } else {
          newsletterInput.style.border = "2px solid #66bb6a";

          setTimeout(function () {
            newsletterInput.style.border = "";
          }, 2000);
        }
      });
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const footerYear = document.querySelector(".footer-bottom p");

  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, currentYear);
  }

  const cards = document.querySelectorAll(
    ".campus-card, .event-card, .resource-card, .app-card, .feature-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      card.style.cursor = "pointer";
    });
  });
});
