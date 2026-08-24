/* =========================================================
   KAPIL ADHIKARI
   PREMIUM TRAVEL PORTFOLIO
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FEATHER ICONS
    ===================================================== */

    if (typeof feather !== "undefined") {
        feather.replace();
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("header");

    function handleHeader() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);
    handleHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");

    function openMenu() {
        mobileMenu.classList.add("open");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    if (menuButton) {
        menuButton.addEventListener("click", openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    document.querySelectorAll(".mobile-menu-inner a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
            closeLightbox();
        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");

    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentImageIndex = 0;

    const galleryData = [];

    galleryItems.forEach((item, index) => {

        const image = item.getAttribute("data-image");
        const title = item.getAttribute("data-title");

        galleryData.push({
            image: image,
            title: title
        });

        item.addEventListener("click", () => {
            openLightbox(index);
        });

    });


    function openLightbox(index) {

        if (!galleryData.length) {
            return;
        }

        currentImageIndex = index;

        const item = galleryData[currentImageIndex];

        lightboxImage.src = item.image;
        lightboxImage.alt = item.title || "Travel photograph";

        if (lightboxTitle) {
            lightboxTitle.textContent = item.title || "";
        }

        lightbox.classList.add("open");
        document.body.classList.add("lightbox-open");

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("open");
        document.body.classList.remove("lightbox-open");

    }


    function showNextImage() {

        if (!galleryData.length) {
            return;
        }

        currentImageIndex =
            (currentImageIndex + 1) % galleryData.length;

        updateLightboxImage();

    }


    function showPreviousImage() {

        if (!galleryData.length) {
            return;
        }

        currentImageIndex =
            (currentImageIndex - 1 + galleryData.length)
            % galleryData.length;

        updateLightboxImage();

    }


    function updateLightboxImage() {

        const item = galleryData[currentImageIndex];

        lightboxImage.style.opacity = "0";

        setTimeout(() => {

            lightboxImage.src = item.image;
            lightboxImage.alt = item.title || "Travel photograph";

            if (lightboxTitle) {
                lightboxTitle.textContent = item.title || "";
            }

            lightboxImage.onload = () => {
                lightboxImage.style.opacity = "1";
            };

        }, 150);

    }


    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", showNextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", showPreviousImage);
    }


    /* =====================================================
       CLICK OUTSIDE LIGHTBOX
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener("click", (event) => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    /* =====================================================
       KEYBOARD GALLERY CONTROL
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

    });


    /* =====================================================
       TOUCH / SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {

        lightbox.addEventListener("touchstart", (event) => {

            touchStartX = event.changedTouches[0].screenX;

        }, { passive: true });


        lightbox.addEventListener("touchend", (event) => {

            touchEndX = event.changedTouches[0].screenX;

            handleSwipe();

        }, { passive: true });

    }


    function handleSwipe() {

        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 50) {
            return;
        }

        if (swipeDistance < 0) {
            showNextImage();
        } else {
            showPreviousImage();
        }

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", function() {

            this.classList.add("image-error");

            console.warn(
                "Image not found:",
                this.getAttribute("src")
            );

        });

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroImage = document.querySelector(".hero-image img");

    window.addEventListener("scroll", () => {

        if (!heroImage) {
            return;
        }

        if (window.scrollY < window.innerHeight) {

            const movement = window.scrollY * 0.12;

            heroImage.style.transform =
                `scale(1.03) translateY(${movement}px)`;

        }

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-intro, " +
        ".section-heading, " +
        ".about-photo, " +
        ".about-text, " +
        ".stat, " +
        ".destination-card, " +
        ".gallery-item, " +
        ".portfolio-item, " +
        ".contact-box"
    );


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       STAGGER CARD ANIMATION
    ===================================================== */

    document.querySelectorAll(
        ".journey-grid .destination-card"
    ).forEach((card, index) => {

        card.style.setProperty(
            "--delay",
            `${index * 80}ms`
        );

    });


    document.querySelectorAll(
        ".gallery-grid .gallery-item"
    ).forEach((item, index) => {

        item.style.setProperty(
            "--delay",
            `${index * 100}ms`
        );

    });


    document.querySelectorAll(
        ".portfolio-grid .portfolio-item"
    ).forEach((item, index) => {

        item.style.setProperty(
            "--delay",
            `${index * 100}ms`
        );

    });


    /* =====================================================
       YEAR
    ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PREVENT EMPTY CONTACT LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="YOUR_"]'
    ).forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            alert(
                "Social media link will be added soon."
            );

        });

    });


    /* =====================================================
       IMAGE PRELOADING FOR GALLERY
    ===================================================== */

    galleryData.forEach(item => {

        const img = new Image();

        img.src = item.image;

    });


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMenu();
        }

    });


    /* =====================================================
       CONSOLE BRAND
    ===================================================== */

    console.log(
        "%c KAPIL ADHIKARI ",
        "background:#18382b;color:white;font-size:18px;font-weight:bold;padding:8px 14px;"
    );

    console.log(
        "%c Nepali Traveler • Arghakhanchi, Nepal ",
        "color:#d96b3b;font-size:12px;font-weight:bold;"
    );

});
