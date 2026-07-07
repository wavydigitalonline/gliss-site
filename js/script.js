/* ==========================================================================
   Gliss — shared behaviour
   Vanilla JS, no build step. Handles: mobile nav toggle, image fallback,
   FAQ accordion, active nav link, and the contact form -> WhatsApp redirect.
   ========================================================================== */

// ---- Your WhatsApp number (digits only, country code, no +) ----
const GLISS_WHATSAPP_NUMBER = "27714636308";

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initImageFallbacks();
  initFaqAccordion();
  initActiveNavLink();
  initContactForm();
  initYear();
});

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the mobile menu after a nav link is tapped
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

/* ---------- Image fallback ----------
   Every <img data-fallback> in the markup has a sibling .img-fallback
   box with a label. If the real image file is missing (404), we hide
   the <img> and show the label instead — so the page never looks
   "broken", it just shows you which file still needs uploading. */
function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      const fallback = img.nextElementSibling;
      if (fallback && fallback.classList.contains("img-fallback")) {
        fallback.style.display = "flex";
      }
    });
  });
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      items.forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- Active nav link highlight ---------- */
function initActiveNavLink() {
  const path = window.location.pathname;
  const pathSegments = path.split("/").filter(Boolean);
  let currentPage = pathSegments[pathSegments.length - 1] || "index.html";
  if (currentPage === "gliss-site") currentPage = "index.html";
  
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("text-white");
      link.classList.remove("text-white/60");
    }
  });
}

/* ---------- Footer year ---------- */
function initYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Contact form -> WhatsApp ----------
   There's no backend, so instead of "sending" the form we build a
   WhatsApp message from whatever the visitor typed and open a
   wa.me chat pre-filled with it. They just hit send on WhatsApp. */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#cf-name")?.value.trim() || "";
    const email = form.querySelector("#cf-email")?.value.trim() || "";
    const phone = form.querySelector("#cf-phone")?.value.trim() || "";
    const service = form.querySelector('input[name="service"]:checked')?.value || "Not sure yet";
    const message = form.querySelector("#cf-message")?.value.trim() || "";

    const lines = [
      "Hi Gliss! I'd like to book a consultation.",
      "",
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Phone: ${phone || "-"}`,
      `Interested in: ${service}`,
    ];
    if (message) lines.push("", `Message: ${message}`);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${GLISS_WHATSAPP_NUMBER}?text=${text}`, "_blank");
  });
}
