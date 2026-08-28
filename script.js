/* =========================================
   KAPIL ADHIKARI
   PERSONAL TRAVEL PORTFOLIO
   FINAL JAVASCRIPT
========================================= */


/* =========================================
   FEATHER ICONS
========================================= */

function loadIcons(){

    if(typeof feather !== "undefined"){
        feather.replace();
    }

}

loadIcons();



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const menuClose =
    document.getElementById("menuClose");

const mobileMenu =
    document.getElementById("mobileMenu");


function openMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.add("active");

    mobileMenu.setAttribute(
        "aria-hidden",
        "false"
    );

    if(menuButton){

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    document.body.style.overflow = "hidden";

}


function closeMenu(){

    if(!mobileMenu) return;

    mobileMenu.classList.remove("active");

    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );

    if(menuButton){

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    document.body.style.overflow = "";

}


if(menuButton){

    menuButton.addEventListener(
        "click",
        openMenu
    );

}


if(menuClose){

    menuClose.addEventListener(
        "click",
        closeMenu
    );

}


/* Close mobile menu after clicking link */

document
    .querySelectorAll(".mobile-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });



/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if(event.key === "Escape"){

            closeMenu();

            closeLightbox();

        }

    }
);



/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.getElementById("siteHeader");


function handleHeader(){

    if(!header) return;

    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeader,
    {passive:true}
);

handleHeader();



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav(){

    let current = "home";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if(window.scrollY >= sectionTop){

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if(href === "#" + current){

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    {passive:true}
);

updateActiveNav();



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if("IntersectionObserver" in window){

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:.12,
                rootMargin:"0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });

}else{

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}



/* =========================================
   GALLERY LIGHTBOX
========================================= */

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


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );


const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );


let currentImageIndex = 0;



/* Open image */

function openLightbox(index){

    if(
        !lightbox ||
        !lightboxImage ||
        galleryItems.length === 0
    ){

        return;

    }


    currentImageIndex = index;


    const item =
        galleryItems[
            currentImageIndex
        ];


    const image =
        item.dataset.image;


    const title =
        item.dataset.title || "";


    lightboxImage.src =
        image;


    lightboxImage.alt =
        title ||
        "Kapil Adhikari travel photograph";


    if(lightboxTitle){

        lightboxTitle.textContent =
            title;

    }


    lightbox.classList.add(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    loadIcons();

}



/* Close lightbox */

function closeLightbox(){

    if(!lightbox) return;


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    if(lightboxImage){

        lightboxImage.src = "";

    }

}



/* Previous image */

function showPrevious(){

    if(galleryItems.length === 0)
        return;


    currentImageIndex--;

    if(currentImageIndex < 0){

        currentImageIndex =
            galleryItems.length - 1;

    }


    openLightbox(
        currentImageIndex
    );

}



/* Next image */

function showNext(){

    if(galleryItems.length === 0)
        return;


    currentImageIndex++;

    if(
        currentImageIndex >=
        galleryItems.length
    ){

        currentImageIndex = 0;

    }


    openLightbox(
        currentImageIndex
    );

}



/* Gallery click */

galleryItems.forEach(
    (item,index) => {

        item.addEventListener(
            "click",
            () => {

                openLightbox(
                    index
                );

            }
        );

    }
);



/* Buttons */

if(lightboxClose){

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if(lightboxPrev){

    lightboxPrev.addEventListener(
        "click",
        showPrevious
    );

}


if(lightboxNext){

    lightboxNext.addEventListener(
        "click",
        showNext
    );

}



/* =========================================
   KEYBOARD GALLERY CONTROL
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if(
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ){

            return;

        }


        if(event.key === "ArrowLeft"){

            showPrevious();

        }


        if(event.key === "ArrowRight"){

            showNext();

        }

    }
);



/* =========================================
   CLICK OUTSIDE IMAGE
========================================= */

if(lightbox){

    lightbox.addEventListener(
        "click",
        event => {

            if(
                event.target === lightbox
            ){

                closeLightbox();

            }

        }
    );

}



/* =========================================
   TOUCH / SWIPE SUPPORT
========================================= */

let touchStartX = 0;
let touchEndX = 0;


if(lightbox){

    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {passive:true}
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchEndX -
                touchStartX;


            if(Math.abs(distance) < 50)
                return;


            if(distance > 0){

                showPrevious();

            }else{

                showNext();

            }

        },
        {passive:true}
    );

}



/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.querySelector(
        ".back-top"
    );


if(backTop){

    backTop.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}



/* =========================================
   YEAR
========================================= */

const yearElement =
    document.getElementById(
        "year"
    );


if(yearElement){

    yearElement.textContent =
        new Date().getFullYear();

}



/* =========================================
   IMAGE ERROR HANDLING
========================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.classList.add(
                    "image-error"
                );

            }
        );

    });



/* =========================================
   PREVENT BROKEN HASH JUMP
========================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if(
                    !targetId ||
                    targetId === "#"
                ){

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if(!target){

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }
        );

    });



/* =========================================
   PAGE LOADED
========================================= */

window.addEventListener(
    "load",
    () => {

        loadIcons();

        handleHeader();

        updateActiveNav();

    }
);
