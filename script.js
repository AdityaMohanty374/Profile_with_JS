// ============================================
//  PROFILE PAGE — script.js
//  Aditya Mohanty
// ============================================


// ─────────────────────────────────────────────
// 1. DARK / LIGHT MODE TOGGLE
// ─────────────────────────────────────────────
const themeBtn = document.getElementById("theme-btn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (themeBtn) themeBtn.textContent = "☀️ Light Mode";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}


// ─────────────────────────────────────────────
// 2. TYPING EFFECT
// ─────────────────────────────────────────────
const typedEl = document.getElementById("typed-text");

const roles = ["Python Developer", "AI/ML Enthusiast", "ECE Student", "Intern @ SecoudSoft"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

type();


// ─────────────────────────────────────────────
// 3. SMOOTH SCROLL
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


// ─────────────────────────────────────────────
// 4. SCROLL ANIMATIONS (fade-in)
// ─────────────────────────────────────────────
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));


// ─────────────────────────────────────────────
// 5. LIVE CLOCK
// ─────────────────────────────────────────────
function updateTime() {
  const el = document.getElementById("currentTime");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: "Asia/Kolkata"
  }) + " IST";
}

updateTime();
setInterval(updateTime, 1000);
