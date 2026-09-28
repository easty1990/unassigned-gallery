(function () {
  const header = document.querySelector(".site-header");
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  });

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  const lightbox = document.querySelector(".lightbox");
  const lbImg = document.querySelector(".lightbox-card img");
  const lbTitle = document.querySelector(".lightbox-info h3");
  const lbSub = document.querySelector(".lightbox-info .sub");
  const lbText = document.querySelector(".lightbox-info p");
  const lbLink = document.querySelector(".lightbox-info .btn");

  document.querySelectorAll("[data-work]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      if (!lightbox) return;
      lbImg.src = el.getAttribute("data-img");
      lbImg.alt = el.getAttribute("data-title") || "";
      lbTitle.textContent = el.getAttribute("data-title");
      lbSub.textContent = el.getAttribute("data-sub");
      lbText.textContent = el.getAttribute("data-note") || "";
      const artist = el.getAttribute("data-enquire");
      lbLink.href = "enquire.html" + (artist ? "?work=" + encodeURIComponent(artist) : "");
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelector(".lightbox-close")?.addEventListener("click", closeLb);
  lightbox?.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLb();
  });

  const form = document.querySelector("form");
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const work = params.get("work");
    if (work && form.work) form.work.value = work;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.innerHTML =
        "<p class='note'>Thank you. The gallery will reply by email. This demo does not send a real message.</p>";
    });
  }
})();
