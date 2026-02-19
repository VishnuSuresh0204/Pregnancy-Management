(function ($) {
    "use strict";
    // --------- INDEX-1 BANNER TITLE ANIMATION ----------

    var textWrapper = document.querySelector('.rv-1-text-animate');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S+/g, "<span class='word'>$&</span>");
    }

    anime.timeline({ loop: true })
        .add({
            targets: '.rv-1-text-animate .word',
            translateX: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 3000,
            delay: (el, i) => 500 + 200 * i
        }).add({
            targets: '.rv-1-text-animate .word',
            translateX: [0, -90],
            opacity: [1, 0],
            easing: "easeInExpo",
            duration: 2900,
            delay: (el, i) => 100 + 150 * i
        });
    // --------- INDEX-1 BANNER TITLE ANIMATION ----------

    // FIXED HEADER =====
    const toFixHeaders = document.querySelectorAll(".to-be-fixed");
    const hamburgerBtn = document.querySelector("#rv-1-header-mobile-menu-btn");
    const mobileMenu = document.querySelector(".rv-1-header-nav__sidebar");
    window.addEventListener("scroll", () => {
        const activeMobileMenu = mobileMenu.classList.contains("active");
        toFixHeaders.forEach(toFixHeader => {
            if (window.scrollY > 100 && !activeMobileMenu) {
                toFixHeader.classList.add("fixed");
                document.body.style.paddingTop = toFixHeader.getBoundingClientRect().height + 'px';
            } else {
                toFixHeader.classList.remove("fixed");
                document.body.style.paddingTop = 0;
            }
        });
    });

    //===== FIXED HEADER


    // Responsive menu dropdown =========================
    const hamburgerCloseBtn = document.querySelector(".sidebar-close-btn");

    if (jQuery(".rv-1-header-nav__sidebar").length > 0) {
        hamburgerBtn.addEventListener("click", () => {
            document.querySelector(".rv-1-header-nav__sidebar").classList.add("active");

            toFixHeaders.forEach(toFixHeader => {
                if (toFixHeader.classList.contains("fixed")) {
                    toFixHeader.classList.remove("fixed");
                }
            });
        });
    }
    if (jQuery(".rv-1-header-nav__sidebar").length > 0) {
        hamburgerCloseBtn.addEventListener("click", () => {
            document.querySelector(".rv-1-header-nav__sidebar").classList.remove("active");
            document.body.parentElement.style.overflowY = "scroll";
        });
    }

    function attachDropdownListeners() {
        const topMenus = document.querySelectorAll(".rv-1-header__nav>ul>li");

        topMenus.forEach(topMenu => {
            // Remove any existing event listeners to prevent duplicates
            topMenu.replaceWith(topMenu.cloneNode(true));
        });

        const updatedTopMenus = document.querySelectorAll(".rv-1-header__nav>ul>li");

        updatedTopMenus.forEach(topMenu => {
            if (window.innerWidth < 992) {
                topMenu.addEventListener('click', () => {
                    topMenu.classList.toggle("rv-dropdown-active");

                    // Remove the class from siblings
                    let siblings = Array.from(topMenu.parentNode.children).filter(child => child !== topMenu);
                    siblings.forEach(sibling => sibling.classList.remove("rv-dropdown-active"));
                });
            }
        });
    }

    // Run the function on page load
    window.addEventListener('DOMContentLoaded', attachDropdownListeners);

    // Run the function on window resize
    window.addEventListener('resize', attachDropdownListeners);

    // ========= Responsive dropdown =============



    // ANIMATION ON SCROLL
    AOS.init({
        duration: 500,
        once: true,
    });


    // INDEX-1 IMAGE REVEAL ANIMATION
    gsap.registerPlugin(ScrollTrigger);
    let imageContainers = document.querySelectorAll(".reveal");

    imageContainers.forEach(imageContainer => {
        let image = imageContainer.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: imageContainer,
                toggleActions: "restart none none reset",
                once: true,
            }
        });

        tl.set(imageContainer, { autoAlpha: 1 });
        tl.from(imageContainer, 0.8, {
            xPercent: -100,
            ease: Power2.out
        });
        tl.from(image, 0.8, {
            xPercent: 100,
            scale: 1.3,
            delay: -0.8,
            ease: Power2.out
        });
    });



    // INDEX-1 SPEAKERS SLIDER
    new Swiper(".rv-1-speakers__slider", {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: true,
        navigation: {
            nextEl: "#rv-1-speakers__slider-nav .next",
            prevEl: "#rv-1-speakers__slider-nav .prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            992: {
                spaceBetween: 20,
                slidesPerView: 4,
            },
            1200: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-1 VIDEO CONTROLS
    const videos = document.querySelectorAll('.rv-1-speaker video');

    videos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // INDEX-1 GALLERY SLIDER
    const gallerySlider = new Swiper(".rv-1-gallery__slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: true,
        navigation: {
            nextEl: "#rv-1-gallery__slider-nav .next",
            prevEl: "#rv-1-gallery__slider-nav .prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                centeredSlides: true,
                spaceBetween: 15,
                slidesPerView: 1.5,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                spaceBetween: 15,
                slidesPerView: 3,
            },
            992: {
                spaceBetween: 20,
            },
            1400: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-1 BLOGS SLIDER
    new Swiper(".rv-1-blogs__slider", {
        spaceBetween: 30,
        autoplay: true,
        navigation: {
            nextEl: "#rv-1-blogs__slider-nav .next",
            prevEl: "#rv-1-blogs__slider-nav .prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                centeredSlides: true,
                spaceBetween: 15,
                slidesPerView: 1.5,
            },
            768: {
                spaceBetween: 15,
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
    });

    // INDEX-2 TEXT ANIMATION
    function textAnimate(sliderElement) {
        const textsToAnimate = sliderElement.querySelectorAll(".rv-text-anime");
        textsToAnimate.forEach(textToAnimate => {
            const animate = new SplitType(textToAnimate, { types: 'words , chars' });
            gsap.from(animate.chars, {
                opacity: 0,
                x: 60,
                duration: 0.5,
                stagger: { amount: 0.9 },
                scrollTrigger: {
                    trigger: textToAnimate,
                    start: "top 95%",
                }
            });
        })
    };

    textAnimate(document);


    // INDEX-2 BLOGS SLIDER
    new Swiper(".rv-2-blogs__slider", {
        slidesPerView: 3,
        spaceBetween: 15,
        autoplay: true,
        navigation: {
            nextEl: "#rv-2-blogs__slider-nav .next",
            prevEl: "#rv-2-blogs__slider-nav .prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
                centeredSlides: true,
                slidesPerView: 1.5,
                loop: true,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
    });


    // INDEX 2 PORTFOLIO SLIDER
    new Swiper(".rv-2-portfolios__slider", {
        slidesPerView: 3,
        spaceBetween: 15,
        autoplay: true,
        pagination: {
            el: ".rv-2-swiper-dots",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
    });


    // INDEX-2 PROGRESS BAR 
    const progressBars = document.querySelectorAll('.progressbar');
    progressBars.forEach(progressBar => {
        const targetValue = parseInt(progressBar.getAttribute('data-value'), 10);
        const progressLabel = progressBar.querySelector(".progress-label");
        let currentValue = 0;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateProgressBar = () => {
                        if (currentValue < targetValue) {
                            currentValue++;
                            progressBar.style.width = `${currentValue}%`;
                            progressLabel.textContent = `${currentValue}%`;
                            requestAnimationFrame(updateProgressBar);
                        }
                    };

                    updateProgressBar();
                    observer.unobserve(progressBar);
                }
            });
        });

        observer.observe(progressBar);
    });


    // INDEX-3 BANNER SLIDER
    new Swiper(".rv-3-banner__slider", {
        loop: true,
        effect: "fade",
        autoplay: true,
        autoHeight: true,
        pagination: {
            el: ".rv-3-banner-swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">0' + (index + 1) + "</span>";
            },
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        }
    });


    // INDEX-3 CATEGORY SLIDER
    new Swiper(".rv-3-categories__slider", {
        autoplay: true,
        slidesPerView: 5,
        spaceBetween: 15,
        pagination: {
            el: "#rv-3-categories-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                centeredSlides: true,
                slidesPerView: 1.5,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            1400: {
                spaceBetween: 30,
            }
        },
    });


    // INDEX-3 CATEGORY SLIDER
    new Swiper(".rv-3-products__slider", {
        autoplay: true,
        slidesPerView: 4,
        spaceBetween: 15,
        navigation: {
            nextEl: "#rv-3-products__slider-nav .next",
            prevEl: "#rv-3-products__slider-nav .prev",
        },
        breakpoints: {
            0: {
                centeredSlides: true,
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-3 PROJECTS SLIDER 
    new Swiper(".rv-3-projects__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: "auto",
        pagination: {
            el: "#rv-3-projects-slider-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2.2,
                centeredSlides: true,
            },
            1400: {
                spaceBetween: 25,
            },
            1600: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-3 TESTIMONIAL SLIDER 
    const testimonialThumb = new Swiper(".rv-3-testimony__img-slider", {
        spaceBetween: 10,
        slidesPerView: "auto",
    });

    new Swiper(".rv-3-testimonial__slider", {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        navigation: {
            nextEl: "#rv-3-testimonial-slider-nav .next",
            prevEl: "#rv-3-testimonial-slider-nav .prev",
        },
        thumbs: {
            swiper: testimonialThumb,
        },
    });

    // INDEX-3 TEAM SLIDER 
    new Swiper(".rv-3-team__slider", {
        autoplay: true,
        spaceBetween: 15,
        slidesPerView: 3,
        pagination: {
            el: "#rv-3-team-slider-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
        },
    });

    // INDEX-3 BLOG SLIDER 
    new Swiper(".rv-3-blogs__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 3,
        pagination: {
            el: "#rv-3-blogs-slider-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
        },
    });

    // INDEX-4 Banner SLIDER 
    new Swiper(".rv-4-banner__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 2,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: "#rv-4-banner-slider-pagination",
            clickable: true,
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1.4,
            },
            992: {
                slidesPerView: 2,
            }
        },
    });


    // INDEX-5 Banner SLIDER 
    var rv5_BannerThumbs = new Swiper(".rv-5-banner__txt-slider", {
        slidesPerView: 1,
        effect: "fade",
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });

    new Swiper(".rv-5-banner__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        effect: "fade",
        loop: true,
        navigation: {
            prevEl: "#rv-5-banner__txt-slider-nav .prev",
            nextEl: "#rv-5-banner__txt-slider-nav .next",
        },
        thumbs: {
            swiper: rv5_BannerThumbs,
        },
    });


    // INDEX-5 SERVICE SLIDER 
    new Swiper(".rv-5-services__slider", {
        autoplay: true,
        spaceBetween: 15,
        slidesPerView: 3,
        pagination: {
            el: "#rv-5-services-slider-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1.6,
                centeredSlides: true,
                loop: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
    });

    // INDEX-5 TEAM SLIDER 
    new Swiper(".rv-5-team__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 3,
        navigation: {
            prevEl: "#rv-5-team-slider-nav .prev",
            nextEl: "#rv-5-team-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
            },
            480: {
                spaceBetween: 20,
                slidesPerView: 1.6,
                centeredSlides: true,
                loop: true,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
    });


    // INDEX-5 TESTIMONIAL SLIDER
    var rv5_testimonialImgSlider = new Swiper('.rv-5-testimonial__img-slider', {
        slidesPerView: 1,
        effect: "fade",
        spaceBetween: 50,
        loop: true,
    })
    new Swiper(".rv-5-testimonial__txt-slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: rv5_testimonialImgSlider,
        },
    });

    // INDEX-5 PARTNERS SLIDER
    new Swiper(".rv-5-partners__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 6,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5
            },
            1200: {
                spaceBetween: 120,
                slidesPerView: 6,
            }
        }
    });

    // INDEX-6 BANNER SLIDER
    new Swiper(".rv-6-banner__slider", {
        // autoplay: true,
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        navigation: {
            prevEl: "#rv-6-banner__slider-nav .prev",
            nextEl: "#rv-6-banner__slider-nav .next",
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });


    // INDEX-6 TEAM SLIDER 
    new Swiper(".rv-6-team__slider", {
        autoplay: true,
        spaceBetween: 15,
        slidesPerView: 4,
        autoHeight: true,
        pagination: {
            el: "#rv-6-team-slider-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                spaceBetween: 20,
            },
            1400: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-6 TESTIMONIAL SLIDER
    var rv6_testimonialImgSlider = new Swiper('.rv-6-testimonial__img-slider', {
        slidesPerView: 1,
        effect: "fade",
        spaceBetween: 50,
        loop: true,
        allowTouchMove: false,
    })
    new Swiper(".rv-6-testimonial__txt-slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: rv6_testimonialImgSlider,
        },
        pagination: {
            el: "#rv-6-testimonial__slider-pagination",
            type: "fraction",

            renderFraction: function (currentClass, totalClass) {
                return '0<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '0<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: ".rv-6-testimonial-slider-nav .next",
            prevEl: ".rv-6-testimonial-slider-nav .prev",
        },
    });

    // INDEX-6 CLIENTS SLIDER
    new Swiper(".rv-6-clients__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 6,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5
            },
            1200: {
                spaceBetween: 120,
                slidesPerView: 6,
            }
        }
    });

    // INDEX-6 BLOGS SLIDER
    new Swiper(".rv-6-blogs__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 2,
        navigation: {
            prevEl: "#rv-6-blogs__slider-nav .prev",
            nextEl: "#rv-6-blogs__slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                centeredSlides: true,
            },
            992: {
                slidesPerView: 1.6,
                centeredSlides: true,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
        },
    });

    // INDEX-7 BANNER SLIDER
    new Swiper(".rv-7-banner__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        // effect: "fade",
        loop: true,
        navigation: {
            prevEl: "#rv-7-banner__slider-nav .prev",
            nextEl: "#rv-7-banner__slider-nav .next",
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });

    // INDEX-7 CATEGORY SLIDER
    new Swiper(".rv-7-categories__slider", {
        spaceBetween: 15,
        slidesPerView: 5,
        scrollbar: {
            el: "#rv-7-categories__scrollbar",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            1400: {
                spaceBetween: 30,
            }
        }
    });

    // INDEX-7 PRODUCT SLIDER
    new Swiper(".rv-7-products__slider", {
        spaceBetween: 15,
        slidesPerView: 4,
        navigation: {
            prevEl: "#rv-7-products__slider-nav .prev",
            nextEl: "#rv-7-products__slider-nav .next"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                centeredSlides: true,
                loop: true,
                slidesPerView: 1.6
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2.3,
                centeredSlides: true,
                loop: true,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 20,
                slidesPerView: 4,
            },
            1400: {
                spaceBetween: 30,
            }
        }
    });

    // INDEX-7 BLOGS SLIDER
    new Swiper(".rv-7-blogs__slider", {
        spaceBetween: 15,
        slidesPerView: 3,
        navigation: {
            prevEl: "#rv-7-blogs__slider-nav .prev",
            nextEl: "#rv-7-blogs__slider-nav .next"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                spaceBetween: 20,
                slidesPerView: 1.6,
                loop: true,
                centeredSlides: true,
            },
            768: {
                spaceBetween: 20,
                slidesPerView: 2,
            },
            992: {
                spaceBetween: 25,
            }
        }
    });

    // INDEX-7 PARTNERS SLIDER
    new Swiper(".rv-7-partners__slider", {
        slidesPerView: 5,
        navigation: {
            prevEl: "#rv-7-partners__slider-nav .prev",
            nextEl: "#rv-7-partners__slider-nav .next"
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5
            },
        }
    });

    // INDEX-7 DAILY-DEAL SLIDER
    new Swiper(".rv-7-daily-deal__slider", {
        slidesPerView: 4,
        spaceBetween: 15,
        navigation: {
            prevEl: "#rv-7-daily-deal__slider-nav .prev",
            nextEl: "#rv-7-daily-deal__slider-nav .next"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                centeredSlides: true,
                loop: true,
                slidesPerView: 1.6
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2.3,
                centeredSlides: true,
                loop: true,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 20,
                slidesPerView: 4,
            },
            1400: {
                spaceBetween: 30,
            }
        }
    });

    // INDEX-7 TRENDING PRODUCT SLIDER
    new Swiper(".rv-7-trending-products__slider", {
        spaceBetween: 15,
        slidesPerView: 4,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                centeredSlides: true,
                loop: true,
                slidesPerView: 1.6
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2.3,
                centeredSlides: true,
                loop: true,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 20,
                slidesPerView: 4,
            },
            1400: {
                spaceBetween: 30,
            }
        }
    });

    // COUNTDOWN
    $.syotimerLang.custom = {
        day: ["D", "D"],
        hour: ["H", "H"],
        minute: ["M", "M"],
        second: ["S", "S"],
    };

    $(".rv-7-daily-deals__countdown").syotimer({
        lang: "custom",
        date: new Date(2023, 12, 9, 20),
        periodic: true,
    });

    // INDEX-8 functions SLIDER
    new Swiper(".rv-8-functions__slider", {
        slidesPerView: 4,
        spaceBetween: 15,
        scrollbar: {
            el: "#rv-8-functions__scrollbar",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
            }
        }
    });

    // INDEX-8 PROJECTS SLIDER 
    new Swiper(".rv-8-projects__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: "auto",
        navigation: {
            prevEl: "#rv-8-projects-slider-nav .prev",
            nextEl: "#rv-8-projects-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2.2,
                centeredSlides: true,
            },
            1400: {
                spaceBetween: 25,
            },
            1600: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-8 TEAM SLIDER 
    new Swiper(".rv-8-team__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 4,
        navigation: {
            prevEl: "#rv-8-team-slider-nav .prev",
            nextEl: "#rv-8-team-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                spaceBetween: 20,
            },
            1400: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-8 TESTIMONIAL SLIDER
    var rv8_testimonialImgSlider = new Swiper('.rv-8-testimonial__img-slider', {
        slidesPerView: 1,
        effect: "fade",
        spaceBetween: 50,
        loop: true,
    })

    // INDEX-8 BANNER SLIDER
    new Swiper(".rv-8-testimonial__txt-slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: rv8_testimonialImgSlider,
        },
        pagination: {
            el: "#rv-8-testimonial__slider-pagination",
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><span class="number">0' + (index + 1) + "</span></span>";
            },
        },
    });

    // INDEX-8 PARTNERS SLIDER
    new Swiper(".rv-8-partners__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 6,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            768: {
                spaceBetween: 30,
                slidesPerView: 4,
            },
            992: {
                spaceBetween: 30,
                slidesPerView: 5
            },
            1200: {
                spaceBetween: 120,
                slidesPerView: 6,
            }
        }
    });

    // INDEX-9 BANNER SLIDER
    new Swiper(".rv-9-banner__slider", {
        autoplay: true,
        slidesPerView: 1,
        loop: true,
        effect: "fade",
        pagination: {
            el: "#rv-9-banner-slider-dots",
            clickable: true,
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });

    // INDEX-9 PROJECTS SLIDER 
    new Swiper(".rv-9-projects__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 2.3,
        loop: true,
        centeredSlides: true,
        navigation: {
            prevEl: "#rv-9-projects-slider-nav .prev",
            nextEl: "#rv-9-projects-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                spaceBetween: 30,
                slidesPerView: 2.5,
            },
            1400: {
                centeredSlides: false,
                slidesPerView: 2.3,
            }
        }
    });

    // INDEX-9 TEAM SLIDER 
    new Swiper(".rv-9-team__slider", {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 15,
        pagination: {
            el: "#rv-9-team-slider-dots",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                spaceBetween: 30,
                slidesPerView: 3,
            }
        }
    });

    // INDEX-10 BANNER SLIDER 
    new Swiper(".rv-10-banner__slider", {
        autoplay: true,
        slidesPerView: 1,
        loop: true,
        effect: "fade",
        navigation: {
            prevEl: '#rv-10-banner__slider-nav .prev',
            nextEl: '#rv-10-banner__slider-nav .next'
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });


    // CURSOR ANIMATION
    var cursor = $(".cursor"),
        follower = $(".cursor-follower");

    var posX = 0,
        posY = 0;

    var mouseX = 0,
        mouseY = 0;

    gsap.to({}, 0.005, {
        repeat: -1,
        onRepeat: function () {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            gsap.set(follower, {
                css: {
                    left: posX - 12,
                    top: posY - 12
                }
            });

            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    $(document).on("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    // add circle
    $("a, button").on("mouseenter", function () {
        cursor.addClass("active");
        follower.addClass("active");
    });
    $("a, button").on("mouseleave", function () {
        cursor.removeClass("active");
        follower.removeClass("active");
    });



    // INDEX-10 TESTIMONIAL SLIDER
    var rv10_testimonialImgSlider = new Swiper('.rv-10-testimonial__img-slider', {
        // slidesPerView: 1.5,
        slidesPerView: "auto",
        loop: true,
        simulateTouch: true,
        watchSlidesProgress: true,
        spaceBetween: 60,
        breakpoints: {
            0: {
                slidesPerView: 1,
            }, 992: {
                slidesPerView: "auto",
            }
        },
    });

    var rv10_testimonialTextSlider = new Swiper(".rv-10-testimonial__txt-slider", {
        // autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: rv10_testimonialImgSlider,
        },
        pagination: {
            el: "#rv-10-testimonial__slider-pagination",
            clickable: true
        }
    });

    // INDEX-10 PARTNER SLIDER
    new Swiper(".rv-10-partners__slider", {
        autoplay: true,
        spaceBetween: 67,
        slidesPerView: 5,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 4,
            },
            768: {
                spaceBetween: 97,
                slidesPerView: 4,
            },
            992: {
                spaceBetween: 97,
                slidesPerView: 5,
            },
            1200: {
                spaceBetween: 147,
                slidesPerView: 5,
            },
            1400: {
                spaceBetween: 157,
                slidesPerView: 5,
            }
        }
    });

    // INDEX-10 BLOGS SLIDER
    new Swiper(".rv-10-blogs__slider", {
        autoplay: true,
        spaceBetween: 15,
        slidesPerView: 3,
        autoHeight: true,
        pagination: {
            el: "#rv-10-blogs-slider-dots",
            clickable: true,
        },
        centeredSlides: true,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1.4,
            },
            576: {
                slidesPerView: 1.6,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
                loop: false,
            },
            992: {
                spaceBetween: 20,
                slidesPerView: 3,
                centeredSlides: false,
                loop: false,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 3,
                centeredSlides: false,
                loop: false,
            }
        }
    });

    // INDEX-11 SERVICE SLIDER
    new Swiper(".rv-11-services__slider", {
        spaceBetween: 20,
        slidesPerView: 4,
        autoplay: true,
        pagination: {
            el: "#rv-11-services-slider-dots",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 4,
            }
        }
    });

    // INDEX-11 PROJECTS SLIDER
    new Swiper(".rv-11-projects__slider", {
        spaceBetween: 20,
        slidesPerView: 3,
        autoplay: true,
        navigation: {
            prevEl: "#rv-11-projects-slider-nav .prev",
            nextEl: "#rv-11-projects-slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 3,
            }
        }
    });

    // INDEX-11 TEAM SLIDER
    new Swiper(".rv-11-team__slider", {
        spaceBetween: 20,
        slidesPerView: 1.3,
        autoplay: true,
        breakpoints: {
            0: {
                centeredSlides: true,
            },
            480: {
                centeredSlides: true,
                slidesPerView: 1.8,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 25,
            },
            768: {
                centeredSlides: true,
                slidesPerView: 2.3,
                spaceBetween: 25,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
            1200: {
                spaceBetween: 45,
                slidesPerView: 3,
            },
            1400: {
                spaceBetween: 60,
                slidesPerView: 3,
            },
        }
    });


    // INDEX-11 PRODUCT SLIDER
    new Swiper(".rv-11-products__slider", {
        spaceBetween: 25,
        slidesPerView: 1,
        autoplay: true,
        navigation: {
            prevEl: "#rv-11-products-slider-nav .prev",
            nextEl: "#rv-11-products-slider-nav .next",
        },
        breakpoints: {
            480: {
                centeredSlides: true,
                slidesPerView: 1.4,
                spaceBetween: 25,
            },
            576: {
                slidesPerView: 1.7,
                spaceBetween: 25,
                centeredSlides: true,
            },
            768: {
                centeredSlides: true,
                slidesPerView: 2.3,
                spaceBetween: 25,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // INDEX-11 blog SLIDER
    new Swiper(".rv-11-blogs__slider", {
        spaceBetween: 20,
        slidesPerView: 1,
        autoplay: true,
        pagination: {
            el: "#rv-11-blogs-slider-dots",
            clickable: true,
        },
        breakpoints: {
            480: {
                centeredSlides: true,
                slidesPerView: 1.4,
            },
            576: {
                centeredSlides: true,
                slidesPerView: 1.6,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 3,
            }
        }
    });

    // INDEX-11 BANNER SLIDER
    new Swiper(".rv-11-banner__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        effect: "fade",
        autoHeight: true,
        loop: true,
        navigation: {
            prevEl: "#rv-11-banner__slider-nav .prev",
            nextEl: "#rv-11-banner__slider-nav .next",
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });

    // INDEX-12 BANNER SLIDER
    new Swiper(".rv-12-banner__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        effect: "fade",
        loop: true,
        pagination: {
            el: "#rv-12-banner-dots",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><span class="number">0' + (index + 1) + "</span></span>";
            },
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });

    // IMAGE SCROLL
    gsap.to("#rv-12-infos-vectors", {
        x: -400,
        duration: 0.1,
        ease: "Linear.easeNone",
        scrollTrigger: {
            trigger: "#rv-12-infos-vectors",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });
    gsap.to("#rv-12-infos-vectors-2", {
        x: 250,
        duration: 0.1,
        ease: "Linear.easeNone",
        scrollTrigger: {
            trigger: "#rv-12-infos-vectors-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });

    // INDEX-12 Banner SLIDER 
    new Swiper(".rv-12-projects__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 1.7,
        centeredSlides: true,
        loop: true,
        navigation: {
            prevEl: "#rv-12-projects__slider-nav .prev",
            nextEl: "#rv-12-projects__slider-nav .next"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1.4,
            },
            768: {
                slidesPerView: 1.8,
            },
            992: {
                slidesPerView: 1.8,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 1.6,
            },
            1400: {
                slidesPerView: 1.6,
                spaceBetween: 40,
            },
            1600: {
                spaceBetween: 50,
            }
        },
    });

    // INDEX-12 TESTIMONIAL SLIDER 
    const rv12TestimonialThumb = new Swiper(".rv-12-testimony__img-slider", {
        spaceBetween: 10,
        slidesPerView: 3,
        slidesPerView: "auto",
    });

    new Swiper(".rv-12-testimonial__slider", {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        pagination: {
            el: "#rv-3-projects-slider-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: "#rv-12-testimonial-slider-nav .next",
            prevEl: "#rv-12-testimonial-slider-nav .prev",
        },
        thumbs: {
            swiper: rv12TestimonialThumb,
        },
    });

    // INDEX-12 PARTNERS SLIDER
    new Swiper(".rv-12-partners__slider", {
        autoplay: true,
        // spaceBetween: 170,
        spaceBetween: 37,
        slidesPerView: 5,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 4,
            },
            768: {
                spaceBetween: 97,
                slidesPerView: 4,
            },
            992: {
                spaceBetween: 97,
                slidesPerView: 5,
            },
            1200: {
                spaceBetween: 147,
                slidesPerView: 5,
            },
            1400: {
                spaceBetween: 170,
                slidesPerView: 5,
            }
        }
    });

    // INDEX-13 BANNER PRODUCT SLIDER
    new Swiper(".rv-13-banner-prod-slider", {
        autoplay: true,
        slidesPerView: 1,
        effect: "fade",
        loop: true,
        pagination: {
            el: "#rv-13-banner-prod-slider__pagination",
            type: "fraction",

            renderFraction: function (currentClass, totalClass) {
                return '0<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '0<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: "#rv-13-banner-prod-slider-nav .next",
            prevEl: "#rv-13-banner-prod-slider-nav .prev",
        },
    });

    // INDEX-13 CATEGORY SLIDER
    new Swiper(".rv-13-products__slider", {
        autoplay: true,
        slidesPerView: 4,
        spaceBetween: 15,
        navigation: {
            nextEl: "#rv-13-products__slider-nav .next",
            prevEl: "#rv-13-products__slider-nav .prev",
        },
        pagination: {
            el: "#rv-13-products-slider-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                centeredSlides: true,
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-13 CATEGORY SLIDER-2
    new Swiper(".rv-13-products__slider-2", {
        autoplay: true,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: "#rv-13-prod-slider-nav-2 .next",
            prevEl: "#rv-13-prod-slider-nav-2 .prev",
        },
        breakpoints: {
            0: {
                centeredSlides: true,
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                spaceBetween: 30,
            }
        },
    });

    // INDEX-6 TESTIMONIAL SLIDER
    var rv13_testimonialImgSlider = new Swiper('.rv-13-testimony-reviewer-slider', {
        slidesPerView: 1,
        effect: "fade",
        spaceBetween: 50,
        loop: true,
    })
    new Swiper(".rv-13-testimonial__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        thumbs: {
            swiper: rv13_testimonialImgSlider,
        },
        pagination: {
            el: "#rv-13-testimonial__slider-pagination",
            type: "fraction",

            renderFraction: function (currentClass, totalClass) {
                return '0<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '0<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: "#rv-13-testimonial-slider-nav .next",
            prevEl: "#rv-13-testimonial-slider-nav .prev",
        },
    });

    // INDEX-13 COUNTDOWN
    $.syotimerLang.custom2 = {
        day: ["Day", "Day"],
        hour: ["Hou", "Hou"],
        minute: ["Min", "Min"],
        second: ["Sec", "Sec"],
    };
    $(".rv-13-weekly-deals__countdown").syotimer({
        lang: "custom2",
        date: new Date(2023, 12, 9, 20),
        periodic: true,
    });

    // INDEX-14 PARTNERS SLIDER
    new Swiper(".rv-14-partners__slider", {
        autoplay: true,
        slidesPerView: 5,
        spaceBetween: 37,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                spaceBetween: 57,
                slidesPerView: 4,
            },
            992: {
                spaceBetween: 67,
                slidesPerView: 4,
            },
            1200: {
                spaceBetween: 87,
                slidesPerView: 5,
            },
            1400: {
                spaceBetween: 123,
                slidesPerView: 5,
            }
        }
    });

    // INDEX-14 BLOGS SLIDER
    new Swiper(".rv-14-blogs__slider", {
        autoplay: true,
        spaceBetween: 30,
        slidesPerView: 2,
        navigation: {
            prevEl: "#rv-14-blogs__slider-nav .prev",
            nextEl: "#rv-14-blogs__slider-nav .next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                centeredSlides: true,
            },
            992: {
                slidesPerView: 1.6,
                centeredSlides: true,
            },
            1200: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
        },
    });

    // INDEX-14 TEAM SLIDER 
    new Swiper(".rv-14-team__slider", {
        autoplay: true,
        spaceBetween: 20,
        slidesPerView: 1,
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                spaceBetween: 32,
                slidesPerView: 4,
            },
            1400: {
                spaceBetween: 57,
                slidesPerView: 4,
            }
        }
    });

    // INDEX-14 TESTIMONIAL SLIDER
    var rv14_caseStudiesImgSlider = new Swiper('.rv-14-case-studies-img-slider', {
        slidesPerView: 1,
        effect: "fade",
        spaceBetween: 50,
        loop: true,
    })
    new Swiper(".rv-14-case-studies-txt-slider", {
        autoplay: true,
        autoHeight: true,
        direction: "vertical",
        spaceBetween: 50,
        slidesPerView: 3,
        mousewheel: true,
        centeredSlides: true,
        thumbs: {
            swiper: rv14_caseStudiesImgSlider,
        },
        breakpoints: {
            0: {
                direction: "horizontal",
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            },
            1400: {
                slidesPerView: 3,
            }
        }
    });



    // PRICE FILTER
    let keypressSliders = document.querySelectorAll(".slider-keypress");

    keypressSliders.forEach(function (keypressSlider, index) {
        let input0 = keypressSlider.parentElement.querySelector(".input-with-keypress-0");
        let input1 = keypressSlider.parentElement.querySelector(".input-with-keypress-1");
        let inputs = [input0, input1];

        if (keypressSlider) {
            noUiSlider.create(keypressSlider, {
                start: [240, 768],
                connect: true,
                step: 1,
                range: {
                    min: [100],
                    max: [1000]
                }
            });

            keypressSlider.noUiSlider.on("update", function (values, handle) {
                inputs[handle].innerText = values[handle];

                function setSliderHandle(i, value) {
                    var r = [null, null];
                    r[i] = value;
                    keypressSlider.noUiSlider.set(r);
                }

                inputs.forEach(function (input, handle) {
                    input.addEventListener("change", function () {
                        setSliderHandle(handle, this.value);
                    });

                    input.addEventListener("keydown", function (e) {
                        var values = keypressSlider.noUiSlider.get();
                        var value = Number(values[handle]);
                        var steps = keypressSlider.noUiSlider.steps();
                        var step = steps[handle];
                        var position;

                        switch (e.which) {
                            case 13:
                                setSliderHandle(handle, this.value);
                                break;

                            case 38:
                                position = step[1];
                                if (position === false) {
                                    position = 1;
                                }
                                if (position !== null) {
                                    setSliderHandle(handle, value + position);
                                }
                                break;

                            case 40:
                                position = step[0];
                                if (position === false) {
                                    position = 1;
                                }
                                if (position !== null) {
                                    setSliderHandle(handle, value - position);
                                }
                                break;
                        }
                    });
                });
            });
        }
    });

    // products slider 
    var rvInnerProducts_details__img1 = new Swiper('.rv-product-details-img-slider-1', {
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        breakpoints: {
            0: {
                direction: "horizontal",
            },
            576: {
                direction: "vertical",
            }
        },
    });

    // products slider 
    var rvInnerProducts_details__img2 = new Swiper('.rv-product-details-img-slider-2', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        thumbs: {
            swiper: rvInnerProducts_details__img1,
        },
    });

    new Swiper('.rv-project-details__cover-slider', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        autoplay: true,
        navigation: {
            prevEl: '#rv-project-details__cover-slider-nav .prev',
            nextEl: '#rv-project-details__cover-slider-nav .next'
        }
    });


    // INDEX-15 BANNER SLIDER
    new Swiper(".rv-15-banner_slider", {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: ".rv-15-banner_slider_next",
            prevEl: ".rv-15-banner_slider_prev",
        },
    });

    //INDEX-15 WORK SECTION
    var rv1WorkSlider = new Swiper(".rv-15-work_content_main", {
        spaceBetween: 10,
    });

    new Swiper(".rv-15-work_area_slide", {
        spaceBetween: 10,
        navigation: {
            prevEl: ".rv-15-work_slide_btn_prev",
            nextEl: ".rv-15-work_slide_btn_next",

        },
        thumbs: {
            swiper: rv1WorkSlider,
        },
    });

    //INDEX-15 BRAND SECTION
    if (jQuery(".rv-15-brand_area_frist_row").length > 0) {
        $('.rv-15-brand_area_frist_row').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 170,
            slideMargin: 30,
            ticker: true,
            speed: 9000
        });
    };
    if (jQuery(".rv-15-brand_area_second_row").length > 0) {
        $('.rv-15-brand_area_second_row').bxSlider({
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 170,
            slideMargin: 30,
            ticker: true,
            speed: 9000,
            autoDirection: 'prev',
        });
    }

    // INDEX-15 TESTIMONIAL
    if (jQuery(".rv-15-testimonial-slider-container").length > 0) {
        $('.rv-15-testimonial-slider-container').owlCarousel({
            loop: true,
            margin: 80,
            nav: true,
            dots: false,
            items: 2,
            center: true,
            navText: ['<i class="far fa-chevron-left"></i>', '<i class="far fa-chevron-right"></i>'],
            responsive: {
                320: {
                    items: 1,
                },
                480: {
                    margin: 40,
                    items: 1.5
                },
                992: {
                    margin: 50,
                }
            }
        });
    }

    // INDEX-15 TEAM AREA SLIDER
    new Swiper(".rv-15-teem_area", {
        slidesPerView: 3,
        spaceBetween: 100,
        loop: true,
        navigation: {
            nextEl: ".rv-15-teem-swiper-button-next",
            prevEl: ".rv-15-teem-swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            980: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 100,
            },

        },

    });

    // INDEX-16 BANNER SLIDER
    if (jQuery(".rv-16-banner_section").length > 0) {
        $('.rv-16-banner_section').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,
        });
    }
    // INDEX-16 DRONE PRODUCT SLIDER
    if (jQuery(".rv-16-dr_product_area").length > 0) {
        $('.rv-16-dr_product_area').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            items: 4,
            autoplay: true,
            dots: false,
            navText: ['<i class="fal fa-arrow-left"></i>', '<i class="fal fa-arrow-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    }

    // INDEX-16 TESTIMONIAL SLIDER
    var swiper2 = new Swiper(".rv-16-testimonial_customer_image", {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
    });
    new Swiper(".rv-16-testimonial_customer_review_area", {
        spaceBetween: 10,
        navigation: {
            prevEl: ".rv-16-testimonial-button-prev",
            nextEl: ".rv-16-testimonial-button-next",
        },
        thumbs: {
            swiper: swiper2,
        },
    });

    // INDEX-17 BANNER SLIDER
    if (jQuery(".rv-17-banner_slider_section").length > 0) {
        $('.rv-17-banner_slider_section').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,

        });
    }

    // video popup
    if (jQuery(".my-video-links").length > 0) {
        new VenoBox({
            selector: '.my-video-links',
        });
    }
    // INDEX-17 UPCOMING MOVIES SECTION
    if (jQuery(".rv-17-upmovies_slide").length > 0) {
        $('.rv-17-upmovies_slide').owlCarousel({
            center: true,
            items: 4,
            loop: true,
            nav: true,
            dots: false,
            margin: 10,
            navText: ['<i class="fal fa-arrow-left"></i>', '<i class="fal fa-arrow-right"></i>'],
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    }

    // INDEX-17 TESTIMONIAL SLIDER
    const swiper3 = new Swiper(".rv-17-testimonial_image_area", {
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
    });
    new Swiper(".rv-17-testimonial", {
        slidesPerView: 1,
        navigation: {
            nextEl: ".rv-17-testimonial-swiper-button-next",
            prevEl: ".rv-17-testimonial-swiper-button-prev",
        },
        thumbs: {
            swiper: swiper3,
        },
    });

    // Show the first tab by default
    $('.rv-17-toprate_movi_list_area li:first').addClass('tab-active');

    // Change tab class and display content
    $('.rv-17-toprate_movi_list_area a').on('click', function (event) {
        event.preventDefault();
        $('.rv-17-toprate_movi_list_area li').removeClass('tab-active');
        $(this).parent().addClass('tab-active');
        $($(this).attr('href')).show();
    });



    // INDEX-18 BANNER SLIDER
    var rv18Banner = new Swiper(".rv-18-banner_slider_bottom_area", {
        spaceBetween: 10,
        slidesPerView: 1,
        freeMode: true,
        loop: true,
        watchSlidesProgress: true,
    });

    new Swiper(".rv-18-banner_slider", {
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.rv-18-banner-swiper-pagination',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
            },
        },
        navigation: {
            nextEl: ".rv-18-banner_slider_next",
        },
        thumbs: {
            swiper: rv18Banner,
        },
    });

    //  INDEX-18 SERVICE SLIDER
    if (jQuery(".rv-18-single_service_slide").length > 0) {
        $('.rv-18-single_service_slide').owlCarousel({
            items: 3,
            loop: true,
            nav: true,
            dots: false,
            margin: 30,
            navText: ['<i class="fal fa-arrow-left"></i>', '<i class="fal fa-arrow-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },

            }

        });
    }

    // INDEX-18 PRICING
    class Tabs {
        constructor(options) {
            this.$el = $(options.el);

            this.setDefaultTabs();
            this.setTabClickHandler();
        }

        setDefaultTabs() {
            this.$tabActive = this.$el.find('.tab--active');
            this.$tabsContent = $(`.tabs-content[data-id=${this.$el.data('id')}]`);

            this.showActiveTabContent(this.$tabActive.data('name'));
        }

        showActiveTabContent(name) {
            this.$tabsContent.find('.tab-content__section').hide();
            this.$tabsContent.find(`.tab-content__section[data-tab-section=${name}]`).show();
        }

        setTabClickHandler() {
            this.$el.find('.tab').on('click', (e) => {
                const $this = $(e.currentTarget);
                const tabsId = this.$el.data('id');

                $this.siblings('li').removeClass('tab--active');
                $this.addClass('tab--active');

                this.showActiveTabContent($this.data('name'));
            });
        }
    }

    $(document).ready(() => {
        function setupTabs() {
            $('.tabs').each((i, element) => {
                new Tabs({ el: element });
            });
        }

        setupTabs()
    });

    // INDEX-18 TESTIMONIAL SLIDER
    new Swiper(".rv-18-testimonial", {
        loop: true,
        navigation: {
            nextEl: ".rv-18-testimonial-swiper-button-next",
            prevEl: ".rv-18-testimonial-swiper-button-prev",
        },
    });

    // INDEX-18  TEEM SECTION
    var swiper = new Swiper(".rv-18-teem_area", {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".rv-18-teem-swiper-button-next",
            prevEl: ".rv-18-teem-swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,

            },
            400: {
                slidesPerView: 2,

            },
            768: {
                slidesPerView: 3,
                spaceBetween: 0,

            },
            992: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
        },
        keyboard: {
            enabled: true,
        }

    });

    // INDEX-18 COMPARE SECTION
    new Swiper(".rv-18-compare_content", {
        slidesPerView: 1,
        navigation: {
            nextEl: ".rv-18-compare-swiper-button-next",
            prevEl: ".rv-18-compare-swiper-button-prev",
        },
    });
    //INDEX-18 COMPARE SECTION BEFORE AFTER IMAGE
    if (jQuery(".rv-18-compare_single_iamge").length > 0) {
        $('.rv-18-compare_single_iamge').beforeAfter({
            movable: true,
            clickMove: true,
            position: 60,
            separatorColor: '#fafafa',
            bulletColor: '#fafafa',
        });
    }

    // INDEX-19 BANNER SLIDER
    if (jQuery(".rv-19-banner_section").length > 0) {
        $('.rv-19-banner_section').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,
        });
    }

    // HOME-5 COMPARE SECTION
    var swiper4 = new Swiper(".rv-19-testimonial_slide", {
        slidesPerView: 1,
        navigation: {
            nextEl: ".rv-5-testimonial-swiper-button-next",
            prevEl: ".rv-5-testimonial-swiper-button-prev",
        },
    });


    // ======== INDEX-19 INSTAGRM SECTION ==========//
    if (jQuery(".rv-19-instagrm_slide").length > 0) {
        $('.rv-19-instagrm_slide').owlCarousel({
            loop: true,
            autoplay: true,
            dots: true,
            items: 6,
            margin: 20,
            responsive: {
                320: {
                    items: 2,
                    margin: 10,
                },
                480: {
                    items: 3
                },
                576: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                },
                1400: {
                    items: 6
                },

            }
        });
    }

    // INDEX-20 BANNER SLIDER
    new Swiper(".rv-20-banner_section", {
        loop: true,
        navigation: {
            nextEl: ".rv-20-banner_slide_button_next",
            prevEl: ".rv-20-banner_slide_button_prev",
        },
    });

    // INDEX-20 SERVICES 
    const rv20_service_cards = document.querySelectorAll(".rv-20-single_service");
    rv20_service_cards.forEach(rv20_service_card => {
        rv20_service_card.addEventListener("mouseover", (e) => {
            const openedItems = document.querySelector(".rv-20-single_service.active");
            if (!rv20_service_card.classList.contains("active")) {
                rv20_service_card.classList.add("active");
                openedItems.classList.remove("active");
            }
        });
    });

    // INDEX-20 TESTIMONIAL SLIDER
    if (jQuery(".rv-20-testimonial").length > 0) {
        $('.rv-20-testimonial').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,

        });
    }

    // INDEX-20 PORTFOLIO SECTION
    new Swiper('.rv-20-portfolio_slide', {
        spaceBetween: 30,
        centeredSlides: true,
        speed: 3500,
        autoplay: {
            delay: 1,
        },
        loop: true,
        slidesPerView: 4,
        allowTouchMove: false,
        disableOnInteraction: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
            },
            980: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 4,
            }
        },
    });

    // INDEX-21 BANNER SLIDER
    new Swiper(".rv-21-banner_section", {
        loop: true,
        navigation: {
            nextEl: ".rv-21-banner_slide_button_next",
            prevEl: ".rv-21-banner_slide_button_prev",
        },
    });

    // INDEX-21 CATEGORIS SECTION
    new Swiper(".rv-21-categorie_slide", {
        loop: true,
        slidesPerView: 6,
        navigation: {
            nextEl: ".rv-21-categorie_slide_button_next",
            prevEl: ".rv-21-categorie_slide_button_prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            980: {
                slidesPerView: 5,
            },
            1280: {
                slidesPerView: 6,
            }
        },
    });

    // INDEX-21 RECENT PRODUCT SECTION
    new Swiper(".rv-21-recent_product_slide", {
        loop: true,
        spaceBetween: 25,
        slidesPerView: 4,
        navigation: {
            nextEl: ".rv-21-recent_product_slide_button_next",
            prevEl: ".rv-21-recent_product_slide_button_prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        },
    });

    // INDEX-21 GALLERY SLIDER
    new Swiper('.rv-21-single_instagrm_slide', {
        centeredSlides: true,
        speed: 3500,
        autoplay: {
            delay: 1,
        },
        // loop: true,
        slidesPerView: 5,
        allowTouchMove: false,
        disableOnInteraction: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 5,
            }
        },
    });

    // INDEX-21 BEST DEAL SECTION
    var rv21bestDealContentSlider = new Swiper(".rv-21-bestdeal_content_slide", {
        slidesPerView: 1,
        spaceBetween: 50,
        freeMode: true,
        watchSlidesProgress: true,
    });
    new Swiper(".rv-21-bestdeal_slide", {
        spaceBetween: 50,
        navigation: {
            nextEl: ".rv-21-bestdeal_slide_button_next",
            prevEl: ".rv-21-bestdeal_slide_button_prev",
        },
        thumbs: {
            swiper: rv21bestDealContentSlider,
        },
    });

    // INDEX-22 BANNER SLIDER
    if (jQuery(".rv-22-banner_section").length > 0) {
        $('.rv-22-banner_section').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,
        });

    }
    // INDEX-22 TEEM SECTION
    var swiper = new Swiper(".rv-22-teem_area", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".rv-22-teem-swiper-button-next",
            prevEl: ".rv-22-teem-swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            980: {
                slidesPerView: 3,
            },

        },

    });

    // INDEX-22 TESTIMONIAL SECTION
    var swiper = new Swiper(".rv-22-testimonial_image_slide", {
        slidesPerView: 2,
        loop: true,
    });
    var swiper = new Swiper(".rv-22-single_testimonial_content_slide", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 50,
        pagination: {
            el: ".rv-22-testimonial-pagination",
            clickable: true,
        },
        thumbs: {
            swiper: swiper,
        },
    });

    // INDEX-22 LOGO SECTION
    var swiper = new Swiper(".rv-22-logo_slide", {
        slidesPerView: 6,
        spaceBetween: 138,
        loop: true,
        centeredSlides: false,
        autoplay: {
            delay: 1500,
            disableOnInteraction: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 60,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 80,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 90,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 100,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 80,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 100,
            },
        },
    });


    // INDEX-23 BANNER SLIDER
    if (jQuery(".rv-23-banner_section").length > 0) {
        $('.rv-23-banner_section').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,

        });
    }

    // INDEX-23 TESTIMONIAL SLIDER
    new Swiper(".rv-23-single_testimonial_slide", {
        pagination: {
            el: '.rv-23-testimonial_pagination',
            type: "fraction",
            renderFraction: function (currentClass, totalClass) {
                return '0<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '0<span class="' + totalClass + '"></span>';
            }
        },
        navigation: {
            nextEl: ".rv-23-ti_next",
            prevEl: ".rv-23-ti_prev",
        },
    });


    // Active Odometer Counter 
    if (jQuery(".odometer").length > 0) {
        jQuery('.odometer').appear(function (e) {
            var odo = jQuery(".odometer");
            odo.each(function () {
                var countNumber = jQuery(this).attr("data-count");
                jQuery(this).html(countNumber);
            });
        });
    }
    // INDEX-23 RECENT PRODUCT SECTION


    // INDEX-24 BANNER SLIDER
    if (jQuery(".rv-24-banner_section").length > 0) {
        $('.rv-24-banner_section').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,

        });
    }

    // INDEX-24 ROOM SLIDER
    new Swiper(".rv-24-room_image_slide", {
        slidesPerView: "3",
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".rv-24-room_next",
            prevEl: ".rv-24-room_prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },

            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    // INDEX-24 RROM-SERVICE SECTION
    new Swiper(".rv-24-room_service_slide", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".rv-24-room-service-swiper-button-next",
            prevEl: ".rv-24-room-service-swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
        },

    });


    // INDEX-24 TESTIMONIAL SECTION
    if (jQuery(".rv-24-single_testimonial_slide").length > 0) {
        $('.rv-24-single_testimonial_slide').owlCarousel({
            loop: true,
            autoplay: false,
            autoplayTimeout: 3000,
            dots: true,
            items: 1,

        });
    }

    // INDEX-24 BLOG SECTION
    new Swiper(".rv-24-blog_slide", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".rv-24-blog-swiper-button-next",
            prevEl: ".rv-24-blog-swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,

            },
            480: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    // INDEX-25 BANNER TEXT ANIMATION
    if (jQuery(".ityped").length > 0) {
        window.ityped.init(document.querySelector('.ityped'), {
            strings: ['Legal Representative', 'Legal Advocate', 'Law Professionals'],
            loop: true,
            typeSpeed: 180,
            backSpeed: 100,
            backDelay: 1000,
            cursorChar: '|',
        })
    }

    // INDEX-25 CASE STADIES SLIDER
    new Swiper(".rv-25-case_studies_image_slide", {
        slidesPerView: "3",
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".rv-25-case_studies_next",
            prevEl: ".rv-25-case_studies_prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    // INDEX-25 TESTIMONIAL SECTION
    if (jQuery(".rv-25-testimonial_slide").length > 0) {
        new Swiper(".rv-25-testimonial_slide", {
            slidesPerView: "2",
            centeredSlides: true,
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: ".rv-25-testimonial_next",
                prevEl: ".rv-25-testimonial_prev",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                480: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 1.5,
                },
                768: {
                    slidesPerView: 1.5,
                },
                992: {
                    slidesPerView: 2,
                },

            },
        });
    }


    /*--- PRODUCT VIEW TYPE CHANGE JS START ---*/

    const gridViewBtn = document.querySelector(".grid-view");
    const listViewBtn = document.querySelector(".list-view");
    const productsRow = document.querySelector(".rv-inner-products-container .row");
    const productsCols = document.querySelectorAll(".rv-inner-products-container .row .col");
    const products = document.querySelectorAll(".rv-inner-products-container .rv-3-product");

    if (listViewBtn) {
        listViewBtn.onclick = () => {
            gridViewBtn.classList.remove("active");
            listViewBtn.classList.add("active");
            productsCols.forEach(productsCol => {
                productsCol.classList.add("list-view-on");
            });
        }
    }

    if (gridViewBtn) {
        gridViewBtn.onclick = () => {
            gridViewBtn.classList.add("active");
            listViewBtn.classList.remove("active");
            productsCols.forEach(productsCol => {
                productsCol.classList.remove("list-view-on");
            });
        }
    }
    /*--- PRODUCT VIEW TYPE CHANGE JS END ---*/



})(jQuery);

