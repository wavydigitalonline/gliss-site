/* GLISS — minimal interaction */
(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Contact form → WhatsApp / mailto style soft handoff
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = Object.fromEntries(new FormData(form).entries());
      var lines = [
        "Hello Kevin — inquiry from gliss.co.za",
        "",
        "Name: " + (data.name || "—"),
        "Email: " + (data.email || "—"),
        data.business ? "Business: " + data.business : null,
        data.interest ? "Interest: " + data.interest : null,
        "",
        data.message || ""
      ].filter(Boolean).join("\n");

      var wa = "https://wa.me/27714636308?text=" + encodeURIComponent(lines);
      window.open(wa, "_blank", "noopener");
    });
  }
})();
