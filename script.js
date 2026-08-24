document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const header = document.getElementById("header");

    const menuBtn = document.getElementById("menuBtn");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");

    const revealElements = document.querySelectorAll(".reveal");
    const statNumbers = document.querySelectorAll("[data-count]");

    const galleryItems = document.querySelectorAll(".gallery-item img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    const yearElement = document.getElementById("year");


    /* LOADER */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hidden");
            }

        }, 700);

    });


    /* HEADER */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    /* MOBILE MENU */

    function openMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

    }


    if (menuBtn) {
        menuBtn.addEventListener("click", openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }


    document
        .querySelectorAll(".mobile-menu nav a")
        .forEach(link => {

            link.addEventListener("click", closeMenu);

        });


    /* ESC KEY */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

            if (
                lightbox &&
                lightbox.classList.contains("active")
            ) {
                closeLightbox();
            }

        }

    });


    /* SCROLL REVEAL */

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* STAT COUNTER */

    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;


        statNumbers.forEach(element => {

            const target = Number(
                element.dataset.count
            );

            if (!target) return;

            const duration = 1500;
            const startTime = performance.now();


            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const current =
                    Math.floor(eased * target);


                if (target === 6) {

                    element.textContent =
                        String(current).padStart(2, "0");

                } else {

                    element.textContent = current;

                }


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    if (target === 24) {
                        element.textContent = "24+";
                    }

                    if (target === 100) {
                        element.textContent = "100+";
                    }

                }

            }


            requestAnimationFrame(updateCounter);

        });

    }


    const statsSection =
        document.querySelector(".stats-section");


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateCounters();

                            statsObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        statsObserver.observe(statsSection);

    }


    /* GALLERY LIGHTBOX */

    let currentImageIndex = 0;


    const imageSources =
        Array.from(galleryItems)
            .map(image => image.src);


    const imageAlts =
        Array.from(galleryItems)
            .map(image => image.alt);


    function openLightbox(index) {

        if (!lightbox || !lightboxImage) return;

        if (!imageSources.length) return;

        currentImageIndex = index;

        lightboxImage.src =
            imageSources[currentImageIndex];

        lightboxImage.alt =
            imageAlts[currentImageIndex] ||
            "Travel photograph";

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    function showNextImage() {

        if (!imageSources.length) return;

        currentImageIndex =
            (currentImageIndex + 1) %
            imageSources.length;

        lightboxImage.src =
            imageSources[currentImageIndex];

        lightboxImage.alt =
            imageAlts[currentImageIndex] ||
            "Travel photograph";

    }


    function showPreviousImage() {

        if (!imageSources.length) return;

        currentImageIndex =
            (currentImageIndex - 1 +
                imageSources.length) %
            imageSources.length;

        lightboxImage.src =
            imageSources[currentImageIndex];

        lightboxImage.alt =
            imageAlts[currentImageIndex] ||
            "Travel photograph";

    }


    galleryItems.forEach((image, index) => {

        image.addEventListener("click", () => {

            openLightbox(index);

        });

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
            showNextImage
        );
    }


    if (lightboxPrev) {
        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );
    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );

    }


    /* KEYBOARD GALLERY */

    document.addEventListener("keydown", event => {

        if (
            !lightbox ||
            !lightbox.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "ArrowRight") {
            showNextImage();
        }


        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

    });


    /* MOBILE SWIPE */

    let touchStartX = 0;
    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {
                    showNextImage();
                } else {
                    showPreviousImage();
                }

            },
            {
                passive: true
            }
        );

    }


    /* ACTIVE NAVIGATION */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(".nav a");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-40% 0px -50% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* SMOOTH NAVIGATION */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* HERO PARALLAX */

    const heroImage =
        document.querySelector(
            ".hero-bg img"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!heroImage) return;

            if (window.innerWidth <= 700) {
                return;
            }


            const scroll =
                window.scrollY;


            if (
                scroll <
                window.innerHeight
            ) {

                heroImage.style.transform =
                    `scale(1.02) translateY(${scroll * 0.08}px)`;

            }

        },
        {
            passive: true
        }
    );


    /* IMAGE ERROR */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "#151515";

                }
            );

        });


    /* FOOTER YEAR */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    document.body.classList.add(
        "page-ready"
    );

});
