/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", initializeApplication);

function initializeApplication() {
  initializeTheme();

  initializeNavbar();

  initializeScrollEffects();

  initializeBackToTop();

  initializeNewsletter();

  initializeLazyLoading();
}

/* ==========================================
   DARK/LIGHT THEME
========================================== */

function initializeTheme() {
  const themeButton = document.getElementById("themeBtn");

  const savedTheme = localStorage.getItem("theme") || "dark";

  document.body.setAttribute("data-theme", savedTheme);

  updateThemeIcon(savedTheme);

  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.body.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);

  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#themeBtn i");

  if (!icon) return;

  icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
}

/* ==========================================
   NAVBAR EFFECT
========================================== */

function initializeNavbar() {
  const navbar = document.querySelector(".header");

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* ==========================================
   SCROLL ANIMATIONS
========================================== */

function initializeScrollEffects() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },

    {
      threshold: 0.15,
    },
  );

  document
    .querySelectorAll(".fade-up,.fade-left,.fade-right")
    .forEach((element) => {
      observer.observe(element);
    });
}

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

function initializeBackToTop() {
  const button = document.getElementById("backToTop");

  if (!button) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.display = "flex";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* ==========================================
   NEWSLETTER
========================================== */

function initializeNewsletter() {
  const form = document.getElementById("newsletterForm");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");

      return;
    }

    localStorage.setItem("subscriber", email);

    alert("Thank you for subscribing!");

    form.reset();
  });
}

/* ==========================================
   EMAIL VALIDATION
========================================== */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================
   LAZY LOADING IMAGES
========================================== */

function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;

        image.src = image.dataset.src;

        image.removeAttribute("data-src");

        imageObserver.unobserve(image);
      }
    });
  });

  images.forEach((image) => {
    imageObserver.observe(image);
  });
}

/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message) {
  const toast = document.createElement("div");

  toast.className = "toast-message";

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* ==========================================
   PAGE LOADER
========================================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

/* ==========================================
   CURRENT YEAR IN FOOTER
========================================== */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* Mouse Spotlight */

document.addEventListener("mousemove", (e) => {
  const spotlight = document.querySelector(".spotlight");

  if (!spotlight) return;

  spotlight.style.left = e.clientX + "px";

  spotlight.style.top = e.clientY + "px";
});

/* Card Tilt */

document.querySelectorAll(".movie-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 20;

    const rotateY = (x - rect.width / 2) / 20;

    card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                `;
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => revealObserver.observe(element));

const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";

  glow.style.top = e.clientY + "px";
});

document.addEventListener("click", function (e) {
  const ripple = document.createElement("div");

  ripple.className = "ripple-effect";

  ripple.style.left = e.clientX + "px";

  ripple.style.top = e.clientY + "px";

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
});

document.querySelectorAll(".movie-slider").forEach((slider) => {
  let scrollAmount = 0;

  setInterval(() => {
    scrollAmount += 320;

    if (scrollAmount >= slider.scrollWidth) {
      scrollAmount = 0;
    }

    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, 4000);
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".header");

  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0,0,0,.85)";
  } else {
    navbar.style.background = "rgba(0,0,0,.35)";
  }
});

document.querySelectorAll(".counter").forEach((counter) => {
  const target = Number(counter.dataset.target);

  let value = 0;

  const step = target / 120;

  const update = () => {
    value += step;

    if (value < target) {
      counter.innerText = Math.floor(value);

      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };

  update();
});
