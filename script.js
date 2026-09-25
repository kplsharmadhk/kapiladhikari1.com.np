/* =========================================================
   KAPIL SHARMA ADHIKARI
   Premium Portfolio Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */

  const body = document.body;

  const header = document.getElementById("siteHeader");

  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const navLinks = document.querySelectorAll(
    ".desktop-nav .nav-link[href^='#']"
  );

  const sections = document.querySelectorAll("main section[id]");

  const revealElements = document.querySelectorAll(".reveal");

  const galleryItems = document.querySelectorAll(".gallery-item");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");

  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const backTop = document.getElementById("backTop");

  const year = document.getElementById("year");
  const mobileYear = document.getElementById("mobileYear");


  /* ================= FEATHER ICONS ================= */

  if (window.feather) {
    feather.replace({
      "stroke-width": 1.5
    });
  }


  /* ================= YEAR ================= */

  const currentYear = new Date().getFullYear();

  if (year) {
    year.textContent = currentYear;
  }

  if (mobileYear) {
    mobileYear.textContent = currentYear;
  }


  /* ================= MOBILE MENU ================= */

  function openMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }

    body.classList.add("menu-open");
  }


  function closeMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

    body.classList.remove("menu-open");
  }


  if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      closeMenu();

    });

  });


  /* ================= ESCAPE ================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeMenu();

      if (lightbox && lightbox.classList.contains("open")) {
        closeLightbox();
      }

    }

  });


  /* ================= HEADER ================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 45) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* ================= ACTIVE NAV ================= */

  function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
      window.scrollY + window.innerHeight * 0.28;

    sections.forEach(section => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener("scroll", updateActiveNav, {
    passive: true
  });

  updateActiveNav();


  /* ================= SMOOTH ANCHORS ================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset =
        window.innerWidth <= 850 ? 20 : 80;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      try {
        history.replaceState(null, "", targetId);
      } catch (error) {
        // Ignore browser history errors.
      }

    });

  });


  /* ================= REVEAL ================= */

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ================= GALLERY ================= */

  let currentImageIndex = 0;

  const galleryData = Array.from(galleryItems).map(item => ({
    image: item.dataset.image,
    title: item.dataset.title || "Gallery",
    element: item
  }));


  function updateLightbox() {

    if (!lightboxImage || !galleryData.length) {
      return;
    }

    const item = galleryData[currentImageIndex];

    lightboxImage.classList.remove("loaded");

    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;

    if (lightboxTitle) {
      lightboxTitle.textContent = item.title;
    }

    if (lightboxCounter) {

      const current =
        String(currentImageIndex + 1).padStart(2, "0");

      const total =
        String(galleryData.length).padStart(2, "0");

      lightboxCounter.textContent =
        `${current} / ${total}`;

    }

  }


  function openLightbox(index) {

    if (!galleryData.length) {
      return;
    }

    currentImageIndex = index;

    updateLightbox();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    body.classList.add("lightbox-open");

  }


  function closeLightbox() {

    if (!lightbox) {
      return;
    }

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    body.classList.remove("lightbox-open");

  }


  function showPrevious() {

    currentImageIndex =
      (currentImageIndex - 1 + galleryData.length) %
      galleryData.length;

    updateLightbox();

  }


  function showNext() {

    currentImageIndex =
      (currentImageIndex + 1) %
      galleryData.length;

    updateLightbox();

  }


  galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {
      openLightbox(index);
    });

  });


  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPrevious);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", showNext);
  }


  /* ================= LIGHTBOX IMAGE ================= */

  if (lightboxImage) {

    lightboxImage.addEventListener("load", () => {
      lightboxImage.classList.add("loaded");
    });

    lightboxImage.addEventListener("error", () => {
      lightboxImage.classList.add("image-error");
      lightboxImage.classList.add("loaded");
    });

  }


  /* ================= LIGHTBOX KEYBOARD ================= */

  document.addEventListener("keydown", event => {

    if (!lightbox || !lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }

  });


  /* ================= LIGHTBOX BACKDROP ================= */

  if (lightbox) {

    lightbox.addEventListener("click", event => {

      if (event.target === lightbox) {
        closeLightbox();
      }

    });

  }


  /* ================= TOUCH / SWIPE ================= */

  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {

    lightbox.addEventListener(
      "touchstart",
      event => {

        if (!event.touches.length) {
          return;
        }

        touchStartX = event.touches[0].clientX;

      },
      { passive: true }
    );


    lightbox.addEventListener(
      "touchend",
      event => {

        if (!event.changedTouches.length) {
          return;
        }

        touchEndX = event.changedTouches[0].clientX;

        const difference =
          touchEndX - touchStartX;

        if (Math.abs(difference) < 50) {
          return;
        }

        if (difference < 0) {
          showNext();
        } else {
          showPrevious();
        }

      },
      { passive: true }
    );

  }


  /* ================= BACK TO TOP ================= */

  function updateBackTop() {

    if (!backTop) {
      return;
    }

    if (window.scrollY > 600) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }

  }

  window.addEventListener("scroll", updateBackTop, {
    passive: true
  });

  updateBackTop();


  if (backTop) {

    backTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* ================= IMAGE FALLBACK ================= */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

      image.classList.add("image-error");

    });

  });


  /* ================= RESIZE ================= */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {
      closeMenu();
    }

  });


  /* ================= WHEEL CONTROL ================= */

  if (lightbox) {

    lightbox.addEventListener(
      "wheel",
      event => {

        if (lightbox.classList.contains("open")) {
          event.preventDefault();
        }

      },
      { passive: false }
    );

  }


  /* ================= INITIAL REFRESH ================= */

  window.addEventListener("load", () => {

    updateHeader();
    updateActiveNav();

    if (window.feather) {
      feather.replace({
        "stroke-width": 1.5
      });
    }

  });

});
