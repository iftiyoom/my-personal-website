/* ===== IFTIYOOM MULATU — Personal Website JS ===== */

/* ── NAV TOGGLE ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  /* ── SCROLL REVEAL ────────────────────────────── */
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay based on position among siblings
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.querySelectorAll(".reveal"))
            : [];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.08}s`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    reveals.forEach(el => el.classList.add("visible"));
  }

  /* ── SET DEFAULT DATE ─────────────────────────── */
  const regdate = document.getElementById("regdate");
  if (regdate) {
    const today = new Date().toISOString().split("T")[0];
    regdate.value = today;
  }

  /* ── FORM VALIDATION ──────────────────────────── */
  const form = document.getElementById("studentForm");

  if (form) {

    // Real-time validation on blur
    const fullname  = document.getElementById("fullname");
    const studentid = document.getElementById("studentid");
    const email     = document.getElementById("email");
    const age       = document.getElementById("age");

    if (fullname)  fullname.addEventListener("blur",  () => validateField(fullname,  "fullname-err",  validateName));
    if (studentid) studentid.addEventListener("blur", () => validateField(studentid, "studentid-err", validateID));
    if (email)     email.addEventListener("blur",     () => validateField(email,     "email-err",     validateEmail));
    if (age)       age.addEventListener("blur",       () => validateField(age,       "age-err",       validateAge));

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let valid = true;

      if (fullname  && !validateField(fullname,  "fullname-err",  validateName))  valid = false;
      if (studentid && !validateField(studentid, "studentid-err", validateID))    valid = false;
      if (email     && !validateField(email,     "email-err",     validateEmail)) valid = false;
      if (age && age.value && !validateField(age, "age-err",      validateAge))   valid = false;

      if (!valid) return;

      // Show success
      const banner = document.getElementById("successBanner");
      if (banner) {
        banner.style.display = "flex";
        banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Optionally reset after delay
      setTimeout(() => {
        form.reset();
        if (banner) banner.style.display = "none";
        if (regdate) regdate.value = new Date().toISOString().split("T")[0];
      }, 4000);
    });

    // Clear invalid state on reset
    form.addEventListener("reset", () => {
      document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
      document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    });
  }
});


/* ── VALIDATION HELPERS ──────────────────────────── */

function validateField(input, errId, fn) {
  const errEl = document.getElementById(errId);
  const result = fn(input.value);
  if (result === true) {
    input.classList.remove("invalid");
    if (errEl) errEl.textContent = "";
    return true;
  } else {
    input.classList.add("invalid");
    if (errEl) errEl.textContent = result;
    return false;
  }
}

function validateName(val) {
  if (!val.trim()) return "Full name is required.";
  if (val.trim().length < 2) return "Name must be at least 2 characters.";
  return true;
}

function validateID(val) {
  if (!val.trim()) return "Student ID is required.";
  return true;
}

function validateEmail(val) {
  if (!val.trim()) return "Email address is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(val)) return "Please enter a valid email address.";
  return true;
}

function validateAge(val) {
  const n = parseInt(val);
  if (isNaN(n)) return "Please enter a valid age.";
  if (n < 15 || n > 60) return "Age must be between 15 and 60.";
  return true;
}


/* ── HOMEPAGE DEMO FUNCTIONS ─────────────────────── */

function showMessage() {
  const output = document.getElementById("output");
  if (!output) return;
  output.innerHTML = "👋 Hello! Thank you for visiting my website. Welcome!";
  output.style.borderLeftColor = "#c8622a";
}

function showDate() {
  const output = document.getElementById("output");
  if (!output) return;
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  output.innerHTML = "📅 " + now.toLocaleDateString("en-US", options);
  output.style.borderLeftColor = "#66bb6a";
}

function showLocation() {
  const output = document.getElementById("output");
  if (!output) return;
  output.innerHTML = "📍 Jimma University, Jimma, Oromia Region, Ethiopia — my academic home!";
  output.style.borderLeftColor = "#42a5f5";
}