/* =========================================
   KAPIL SHARMA ADHIKARI
   PERSONAL TRAVEL PORTFOLIO
   PREMIUM FINAL JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   01 — DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       ELEMENTS
    ====================================== */

    const body = document.body;

    const header =
        document.getElementById("siteHeader");

    const menuButton =
        document.getElementById("menuButton");

    const menuClose =
        document.getElementById("menuClose");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-link");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("main section[id]");

    const revealElements =
        document.querySelectorAll(".reveal");

    const galleryItems =
        Array.from(
            document.querySelectorAll(".gallery-item")
        );

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");

    const backTop =
        document.querySelector(".back-top");

    const yearElement =
        document.getElementById("year");

    const mobileYearElement =
        document.getElementById("mobileYear");


    /* =====================================
       02 — FEATHER ICONS
    ====================================== */

    function loadIcons() {

        if (typeof feather !== "undefined") {

            feather.replace({
                "stroke-width": 1.6
            });

        }

    }


    loadIcons();



    /* =====================================
       03 — MOBILE MENU
    ====================================== */

    function openMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("active");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        body.classList.add("menu-open");

    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        body.classList.remove("menu-open");

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMenu
        );

    }


    if (menuClose) {

        menuClose.addEventListener(
            "click",
            closeMenu
        );

    }


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });



    /* =====================================
       04 — ESC KEY
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            closeMenu();


            if (
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );



    /* =====================================
       05 — HEADER SCROLL EFFECT
    ====================================== */

    function handleHeader() {

        if (!header) return;


        if (window.scrollY > 45) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeader,
        {
            passive: true
        }
    );


    handleHeader();



    /* =====================================
       06 — ACTIVE NAVIGATION
    ====================================== */

    function updateActiveNav() {

        if (!sections.length) {
            return;
        }


        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 220;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            if (
                scrollPosition >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    updateActiveNav();



    /* =====================================
       07 — SMOOTH ANCHOR NAVIGATION
    ====================================== */

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


                    let target;


                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    closeMenu();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });


                    /*
                     * Keep URL hash updated
                     * without triggering jump.
                     */

                    if (
                        history.replaceState
                    ) {

                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    }

                }
            );

        });



    /* =====================================
       08 — SCROLL REVEAL
    ====================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================
       09 — LIGHTBOX STATE
    ====================================== */

    let currentImageIndex = 0;



    /* =====================================
       10 — UPDATE LIGHTBOX
    ====================================== */

    function updateLightbox(index) {

        if (
            !lightbox ||
            !lightboxImage ||
            !galleryItems.length
        ) {

            return;

        }


        const safeIndex =
            (
                index +
                galleryItems.length
            ) %
            galleryItems.length;


        currentImageIndex =
            safeIndex;


        const item =
            galleryItems[
                currentImageIndex
            ];


        const image =
            item.dataset.image;


        const title =
            item.dataset.title || "";


        if (!image) {
            return;
        }


        /*
         * Fade old image before
         * loading the new one.
         */

        lightboxImage.style.opacity =
            "0";


        const preload =
            new Image();


        preload.onload = () => {

            lightboxImage.src =
                image;


            lightboxImage.alt =
                title ||
                "Kapil Sharma Adhikari travel photograph";


            requestAnimationFrame(() => {

                lightboxImage.style.opacity =
                    "1";

            });

        };


        preload.onerror = () => {

            lightboxImage.src =
                image;


            lightboxImage.alt =
                "Travel photograph";

            lightboxImage.style.opacity =
                "1";

        };


        preload.src =
            image;


        if (lightboxTitle) {

            lightboxTitle.textContent =
                title;

        }

    }



    /* =====================================
       11 — OPEN LIGHTBOX
    ====================================== */

    function openLightbox(index) {

        if (
            !lightbox ||
            !galleryItems.length
        ) {

            return;

        }


        updateLightbox(index);


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "lightbox-open"
        );


        loadIcons();


        /*
         * Move keyboard focus to close
         * button for accessibility.
         */

        if (lightboxClose) {

            setTimeout(() => {

                lightboxClose.focus();

            }, 50);

        }

    }



    /* =====================================
       12 — CLOSE LIGHTBOX
    ====================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        body.classList.remove(
            "lightbox-open"
        );


        if (lightboxImage) {

            lightboxImage.style.opacity =
                "0";

            lightboxImage.removeAttribute(
                "src"
            );

        }


        if (lightboxTitle) {

            lightboxTitle.textContent =
                "";

        }

    }



    /* =====================================
       13 — PREVIOUS IMAGE
    ====================================== */

    function showPrevious() {

        if (!galleryItems.length) {
            return;
        }


        updateLightbox(
            currentImageIndex - 1
        );

    }



    /* =====================================
       14 — NEXT IMAGE
    ====================================== */

    function showNext() {

        if (!galleryItems.length) {
            return;
        }


        updateLightbox(
            currentImageIndex + 1
        );

    }



    /* =====================================
       15 — GALLERY CLICK
    ====================================== */

    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    openLightbox(
                        index
                    );

                }
            );


            /*
             * Keyboard support for
             * gallery buttons.
             */

            item.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        openLightbox(
                            index
                        );

                    }

                }
            );

        }
    );



    /* =====================================
       16 — LIGHTBOX BUTTONS
    ====================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                showPrevious();

            }
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                showNext();

            }
        );

    }



    /* =====================================
       17 — KEYBOARD GALLERY CONTROL
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            switch (event.key) {

                case "ArrowLeft":

                    event.preventDefault();

                    showPrevious();

                    break;


                case "ArrowRight":

                    event.preventDefault();

                    showNext();

                    break;

            }

        }
    );



    /* =====================================
       18 — CLICK OUTSIDE LIGHTBOX
    ====================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =====================================
       19 — TOUCH / SWIPE
    ====================================== */

    let touchStartX = 0;
    let touchStartY = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                const touch =
                    event.changedTouches[0];


                if (!touch) return;


                touchStartX =
                    touch.screenX;


                touchStartY =
                    touch.screenY;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                const touch =
                    event.changedTouches[0];


                if (!touch) return;


                const touchEndX =
                    touch.screenX;


                const touchEndY =
                    touch.screenY;


                const distanceX =
                    touchEndX -
                    touchStartX;


                const distanceY =
                    touchEndY -
                    touchStartY;


                /*
                 * Ignore vertical gestures.
                 */

                if (
                    Math.abs(distanceX) < 55 ||
                    Math.abs(distanceX) <
                    Math.abs(distanceY)
                ) {

                    return;

                }


                if (distanceX > 0) {

                    showPrevious();

                } else {

                    showNext();

                }

            },
            {
                passive: true
            }
        );

    }



    /* =====================================
       20 — BACK TO TOP
    ====================================== */

    if (backTop) {

        backTop.addEventListener(
            "click",
            event => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }
        );

    }



    /* =====================================
       21 — YEAR
    ====================================== */

    const currentYear =
        new Date().getFullYear();


    if (yearElement) {

        yearElement.textContent =
            currentYear;

    }


    if (mobileYearElement) {

        mobileYearElement.textContent =
            currentYear;

    }



    /* =====================================
       22 — IMAGE ERROR HANDLING
    ====================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.classList.add(
                        "image-error"
                    );

                    img.setAttribute(
                        "data-image-error",
                        "true"
                    );

                }
            );

        });



    /* =====================================
       23 — IMAGE LOADED STATE
    ====================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            if (img.complete) {

                img.classList.add(
                    "image-loaded"
                );

            } else {

                img.addEventListener(
                    "load",
                    () => {

                        img.classList.add(
                            "image-loaded"
                        );

                    },
                    {
                        once: true
                    }
                );

            }

        });



    /* =====================================
       24 — CLOSE MENU ON RESIZE
    ====================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                mobileMenu &&
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            }

        },
        {
            passive: true
        }
    );



    /* =====================================
       25 — PREVENT LIGHTBOX SCROLL
    ====================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "wheel",
            event => {

                if (
                    lightbox.classList.contains(
                        "active"
                    )
                ) {

                    event.preventDefault();

                }

            },
            {
                passive: false
            }
        );

    }



    /* =====================================
       26 — PAGE LOAD
    ====================================== */

    window.addEventListener(
        "load",
        () => {

            loadIcons();

            handleHeader();

            updateActiveNav();

        }
    );


});
