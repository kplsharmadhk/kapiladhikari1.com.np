document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const backToTop = document.getElementById("backToTop");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const galleryImages = Array.from(
    document.querySelectorAll("[data-lightbox]")
  );

  let currentLightboxIndex = 0;


  /* ================= HEADER ================= */

  function updateHeader() {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* ================= MOBILE MENU ================= */

  function openMenu() {
    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {

    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }

  });

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  /* ================= ACTIVE NAV ================= */

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* ================= SMOOTH ANCHORS ================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const offset = 70;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      history.replaceState(null, "", targetId);

    });

  });


  /* ================= REVEAL ANIMATION ================= */

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        revealObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });


  /* ================= LIGHTBOX ================= */

  function updateLightbox(index) {

    if (!galleryImages.length) return;

    currentLightboxIndex =
      (index + galleryImages.length) %
      galleryImages.length;

    const selected = galleryImages[currentLightboxIndex];

    const src = selected.getAttribute("src");
    const title =
      selected.dataset.title ||
      selected.alt ||
      "Gallery";

    lightboxImage.src = src;
    lightboxImage.alt = selected.alt || title;
    lightboxTitle.textContent = title;

    lightboxCounter.textContent =
      `${currentLightboxIndex + 1} / ${galleryImages.length}`;

  }


  function openLightbox(index) {

    updateLightbox(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

  }


  function closeLightbox() {

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      lightboxImage.src = "";
    }, 300);

  }


  galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {
      openLightbox(index);
    });

  });


  lightboxClose?.addEventListener("click", closeLightbox);

  lightboxPrev?.addEventListener("click", () => {
    updateLightbox(currentLightboxIndex - 1);
  });

  lightboxNext?.addEventListener("click", () => {
    updateLightbox(currentLightboxIndex + 1);
  });


  lightbox?.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  /* ================= KEYBOARD ================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (lightbox.classList.contains("open")) {
        closeLightbox();
      }

      if (mobileMenu.classList.contains("open")) {
        closeMenu();
      }

    }


    if (!lightbox.classList.contains("open")) return;

    if (event.key === "ArrowLeft") {
      updateLightbox(currentLightboxIndex - 1);
    }

    if (event.key === "ArrowRight") {
      updateLightbox(currentLightboxIndex + 1);
    }

  });


  /* ================= TOUCH / SWIPE ================= */

  let touchStartX = 0;
  let touchEndX = 0;

  lightbox?.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    {
      passive: true
    }
  );


  lightbox?.addEventListener(
    "touchend",
    event => {

      touchEndX =
        event.changedTouches[0].screenX;

      const distance =
        touchEndX - touchStartX;

      if (Math.abs(distance) < 50) return;

      if (distance < 0) {
        updateLightbox(currentLightboxIndex + 1);
      } else {
        updateLightbox(currentLightboxIndex - 1);
      }

    },
    {
      passive: true
    }
  );


  /* ================= BACK TO TOP ================= */

  backToTop?.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* ================= YEAR ================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* ================= IMAGE ERROR ================= */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

      image.style.background = "#dfe7ef";
      image.style.objectFit = "cover";

    });

  });


  /* ================= RESIZE ================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 850 &&
      mobileMenu.classList.contains("open")
    ) {
      closeMenu();
    }

  });


  /* ================= FEATHER ICONS ================= */

  if (window.feather) {
    feather.replace();
  }

});
