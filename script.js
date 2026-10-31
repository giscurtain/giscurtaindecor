/*==============================================================================
    GIS CURTAIN DÉCOR
    File        : script.js
    Version     : 2.0.0
    Description : Global Website Script
    Author      : GIS Curtain Décor

    ---------------------------------------------------------------------------
    TABLE OF CONTENTS
    ---------------------------------------------------------------------------
    01. DOM Ready
    02. Cached Elements
    03. Sticky Header
    04. Mobile Navigation
    05. Hero Slider
    06. Scroll Reveal
    07. Back To Top
    08. Smooth Scrolling
    09. Active Navigation
==============================================================================*/

"use strict";

/*==============================================================================
    01. DOM READY
==============================================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});


/*==============================================================================
    WEBSITE INITIALIZER
==============================================================================*/

function initializeWebsite() {

    setupStickyHeader();

    setupMobileMenu();

    setupHeroSlider();

    setupScrollReveal();

    setupBackToTop();

    setupSmoothScroll();

    setupActiveNavigation();

}


/*==============================================================================
    02. CACHED ELEMENTS
==============================================================================*/

const header = document.querySelector("header");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const backToTop = document.querySelector(".back-to-top");

const heroSlides = document.querySelectorAll(".slide");

const navigationLinks = document.querySelectorAll(".nav-menu a");


/*==============================================================================
    03. STICKY HEADER
==============================================================================*/

function setupStickyHeader() {

    if (!header) return;

    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {

        passive: true

    });

}


/*==============================================================================
    04. MOBILE NAVIGATION
==============================================================================*/

function setupMobileMenu() {

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const expanded = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", !expanded);

        document.body.classList.toggle("menu-open");

    });

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("click", (event) => {

        if (

            !navMenu.contains(event.target) &&

            !menuToggle.contains(event.target)

        ) {

            navMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/*==============================================================================
    05. HERO SLIDER
==============================================================================*/

function setupHeroSlider() {

    if (!heroSlides.length) return;

    let currentSlide = 0;

    const showSlide = (index) => {

        heroSlides.forEach(slide => {

            slide.classList.remove("active");

        });

        heroSlides[index].classList.add("active");

    };

    showSlide(currentSlide);

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= heroSlides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 5000);

}/*==============================================================================
    06. SCROLL REVEAL
==============================================================================*/

function setupScrollReveal() {

    const revealElements = document.querySelectorAll(

        ".section-title," +
        ".products-grid," +
        ".product-grid," +
        ".about-grid," +
        ".why-grid," +
        ".contact-grid," +
        ".footer," +
        ".story-grid," +
        ".mission-grid," +
        ".values-grid," +
        ".process-grid," +
        ".reveal"

    );

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: 0.15,

            rootMargin: "0px 0px -60px 0px"

        }

    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/*==============================================================================
    07. BACK TO TOP BUTTON
==============================================================================*/

function setupBackToTop() {

    if (!backToTop) return;

    const toggleButton = () => {

        if (window.scrollY > 350) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };

    toggleButton();

    window.addEventListener(

        "scroll",

        toggleButton,

        {

            passive: true

        }

    );

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*==============================================================================
    08. SMOOTH SCROLL
==============================================================================*/

function setupSmoothScroll() {

    const anchors = document.querySelectorAll(

        'a[href^="#"]:not([href="#"])'

    );

    if (!anchors.length) return;

    anchors.forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId = anchor.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header

                ? header.offsetHeight

                : 0;

            const targetPosition =

                target.getBoundingClientRect().top +

                window.pageYOffset -

                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/*==============================================================================
    09. ACTIVE NAVIGATION
==============================================================================*/

function setupActiveNavigation() {

    if (!navigationLinks.length) return;

    const sections = document.querySelectorAll("section[id]");

    if (!sections.length) return;

    const updateActiveLink = () => {

        const scrollPosition =

            window.scrollY +

            (header ? header.offsetHeight + 40 : 100);

        sections.forEach(section => {

            const top = section.offsetTop;

            const height = section.offsetHeight;

            const id = section.getAttribute("id");

            if (

                scrollPosition >= top &&

                scrollPosition < top + height

            ) {

                navigationLinks.forEach(link => {

                    link.classList.remove("active");

                    if (

                        link.getAttribute("href") === `#${id}` ||

                        link.getAttribute("href") ===

                        `${window.location.pathname.split("/").pop()}#${id}`

                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    };

    updateActiveLink();

    window.addEventListener(

        "scroll",

        updateActiveLink,

        {

            passive: true

        }

    );

}/*==============================================================================
    10. WINDOW RESIZE HANDLER
==============================================================================*/

window.addEventListener(

    "resize",

    debounce(() => {

        if (

            window.innerWidth > 992 &&

            navMenu &&

            navMenu.classList.contains("active")

        ) {

            navMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            if (menuToggle) {

                menuToggle.setAttribute(

                    "aria-expanded",

                    "false"

                );

            }

        }

    }, 150)

);


/*==============================================================================
    11. ESC KEY SUPPORT
==============================================================================*/

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (!navMenu || !navMenu.classList.contains("active")) return;

    navMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

    if (menuToggle) {

        menuToggle.setAttribute(

            "aria-expanded",

            "false"

        );

        menuToggle.focus();

    }

});


/*==============================================================================
    12. IMAGE LAZY ENHANCEMENT
==============================================================================*/

(function enhanceImages() {

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        if (!image.hasAttribute("loading")) {

            image.setAttribute("loading", "lazy");

        }

        if (!image.hasAttribute("decoding")) {

            image.setAttribute("decoding", "async");

        }

    });

})();


/*==============================================================================
    13. PERFORMANCE HELPERS
==============================================================================*/

function debounce(callback, delay = 200) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback.apply(null, args);

        }, delay);

    };

}


/*------------------------------------------------------------------------------
    Throttle Helper
------------------------------------------------------------------------------*/

function throttle(callback, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback.apply(null, args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}


/*==============================================================================
    14. PAGE VISIBILITY
==============================================================================*/

document.addEventListener(

    "visibilitychange",

    () => {

        document.documentElement.classList.toggle(

            "page-hidden",

            document.hidden

        );

    }

);


/*==============================================================================
    15. CONSOLE BRANDING
==============================================================================*/

console.info(

    "%cGIS Curtain Décor",

    "color:#C8A96A;font-size:16px;font-weight:bold;"

);

console.info(

    "Production Version 2.0.0"

);


/*==============================================================================
    END OF FILE
==============================================================================*/