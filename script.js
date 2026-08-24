document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       KAPIL ADHIKARI
       PREMIUM TRAVEL WEBSITE JS
    =============================== */

    // Feather Icons
    if (window.feather) {
        feather.replace();
    }


    /* ===============================
       HEADER SCROLL EFFECT
    =============================== */

    const header = document.getElementById("site-header");

    const handleHeader = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });

    handleHeader();


    /* ===============================
       MOBILE MENU
    =============================== */

    const mobileToggle =
        document.getElementById("mobile-toggle");

    const mobileDrawer =
        document.getElementById("mobile-drawer");

    const mobileLinks =
        document.querySelectorAll(".mobile-link");


    const closeMobileMenu = () => {
        if (!mobileToggle || !mobileDrawer) return;

        mobileToggle.classList.remove("active");
        mobileDrawer.classList.remove("open");
        document.body.style.overflow = "";
    };


    const toggleMobileMenu = () => {
        if (!mobileToggle || !mobileDrawer) return;

        const isOpen =
            mobileDrawer.classList.toggle("open");

        mobileToggle.classList.toggle("active", isOpen);

        document.body.style.overflow =
            isOpen ? "hidden" : "";
    };


    if (mobileToggle) {
        mobileToggle.addEventListener(
            "click",
            toggleMobileMenu
        );
    }


    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });


    /* ===============================
       ACTIVE NAVIGATION
    =============================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* ===============================
       SMOOTH ANCHOR SCROLL
    =============================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", function(e) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) return;

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* ===============================
       IMAGE FALLBACK
       Prevent broken images
    =============================== */

    const fallbackSVG = (
        title,
        background = "1B3B2B",
        text = "FBF9F5"
    ) => {

        return `
        data:image/svg+xml;charset=UTF-8,
        <svg xmlns="http://www.w3.org/2000/svg"
        width="1200"
        height="800"
        viewBox="0 0 1200 800">

        <rect width="1200"
        height="800"
        fill="%23${background}"/>

        <text
        x="600"
        y="400"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Georgia"
        font-size="42"
        fill="%23${text}">
        ${encodeURIComponent(title)}
        </text>

        </svg>
        `;
    };


    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener("error", function() {

                if (this.dataset.fallbackUsed) {
                    return;
                }

                this.dataset.fallbackUsed = "true";

                const alt =
                    this.getAttribute("alt") ||
                    "Kapil Adhikari Travel";

                if (
                    this.classList.contains(
                        "img-fallback-hero"
                    )
                ) {

                    this.src = fallbackSVG(
                        "KAPIL ADHIKARI",
                        "1B3B2B",
                        "C89D55"
                    );

                } else if (
                    this.classList.contains(
                        "img-fallback-profile"
                    )
                ) {

                    this.src = fallbackSVG(
                        "KAPIL ADHIKARI",
                        "2A523D",
                        "FBF9F5"
                    );

                } else {

                    this.src = fallbackSVG(
                        alt,
                        "3B8A88",
                        "FBF9F5"
                    );

                }

            });

        });


    /* ===============================
       SCROLL REVEAL ANIMATION
    =============================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".about-text-column, " +
            ".about-image-column, " +
            ".journey-card, " +
            ".timeline-item, " +
            ".portfolio-card, " +
            ".gallery-item, " +
            ".stat-card"
        );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add(
                "reveal-visible"
            );
        });

    }


    /* ===============================
       GALLERY LIGHTBOX
    =============================== */

    const galleryItems =
        Array.from(
            document.querySelectorAll(
                ".gallery-item"
            )
        );


    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImg =
        document.getElementById(
            "lightbox-img"
        );

    const lightboxCaption =
        document.getElementById(
            "lightbox-caption"
        );

    const lightboxClose =
        document.getElementById(
            "lightbox-close"
        );

    const lightboxNext =
        document.getElementById(
            "lightbox-next"
        );

    const lightboxPrev =
        document.getElementById(
            "lightbox-prev"
        );


    let currentIndex = 0;


    const getVisibleGallery =
        () => {

            return galleryItems.filter(
                item =>
                    item.style.display !==
                    "none"
            );

        };


    const openLightbox = index => {

        const items =
            getVisibleGallery();

        if (
            !items.length ||
            !lightbox
        ) return;


        currentIndex = index;

        const item =
            items[currentIndex];


        const image =
            item.querySelector("img");


        const source =
            item.dataset.src ||
            image?.src;


        const caption =
            item.dataset.caption ||
            image?.alt ||
            "Kapil Adhikari";


        if (lightboxImg) {
            lightboxImg.src = source;
        }

        if (lightboxCaption) {
            lightboxCaption.textContent =
                caption;
        }


        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    };


    const closeLightbox = () => {

        if (!lightbox) return;

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    };


    const nextImage = () => {

        const items =
            getVisibleGallery();

        if (!items.length) return;

        currentIndex =
            (currentIndex + 1) %
            items.length;

        openLightbox(currentIndex);

    };


    const previousImage = () => {

        const items =
            getVisibleGallery();

        if (!items.length) return;

        currentIndex =
            (currentIndex - 1 +
            items.length) %
            items.length;

        openLightbox(currentIndex);

    };


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const items =
                    getVisibleGallery();

                const index =
                    items.indexOf(item);

                if (index !== -1) {
                    openLightbox(index);
                }

            }
        );

    });


    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }


    if (lightboxNext) {
        lightboxNext.addEventListener(
            "click",
            nextImage
        );
    }


    if (lightboxPrev) {
        lightboxPrev.addEventListener(
            "click",
            previousImage
        );
    }


    /* ===============================
       KEYBOARD LIGHTBOX
    =============================== */

    document.addEventListener(
        "keydown",
        e => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) return;


            if (e.key === "Escape") {
                closeLightbox();
            }

            if (e.key === "ArrowRight") {
                nextImage();
            }

            if (e.key === "ArrowLeft") {
                previousImage();
            }

        }
    );


    /* ===============================
       MOBILE SWIPE
    =============================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            e => {

                touchStartX =
                    e.changedTouches[0]
                    .screenX;

            },
            { passive: true }
        );


        lightbox.addEventListener(
            "touchend",
            e => {

                touchEndX =
                    e.changedTouches[0]
                    .screenX;


                const distance =
                    touchEndX -
                    touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {
                    nextImage();
                } else {
                    previousImage();
                }

            },
            { passive: true }
        );

    }


    /* ===============================
       CONTACT FORM
    =============================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                alert(
                    "Thank you for your message. Kapil will get back to you soon."
                );

                contactForm.reset();

            }
        );

    }


    /* ===============================
       CURRENT YEAR
    =============================== */

    const year =
        document.getElementById(
            "copyright-year"
        );

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* ===============================
       ESCAPE MOBILE MENU
    =============================== */

    document.addEventListener(
        "keydown",
        e => {

            if (e.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* ===============================
       PAGE READY
    =============================== */

    document.body.classList.add(
        "page-ready"
    );

});
