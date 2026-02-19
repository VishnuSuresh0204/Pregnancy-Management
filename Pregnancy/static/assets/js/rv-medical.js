$(document).ready(function () {



    //------------------------------------------------------------------------------------------------------------------
    // Overlay Scroll Bar Init
    //------------------------------------------------------------------------------------------------------------------


    // For index 26  ==============================================================================


    // for menu active class
    $('.rv-26-menu-list li ').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    // Scroll Reveal

    const sr = ScrollReveal({
        origin: 'top',
        duration: 700,
        distance: '60px',
        delay: 50,

    })

    sr.reveal('.rv-26-team-member', { interval: 100, distance: '60px', origin: "bottom" })
    sr.reveal('.rv-26-about__img', { origin: "left" })
    sr.reveal('.rv-26-skill-section__img', { origin: "right" })

    // for about slider
    var rvAbtSlider = new Swiper(".rv-26-about-swiper-container", {
        slidesPerView: 2,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        pagination: {
            el: ".rv-26-carousel-indicator",
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                spaceBetween: 15,
                slidesPerView: 1.5,
            },
            768: {
                spaceBetween: 15,
                slidesPerView: 2,
            },

        },

    });


    // video tab option =====

    $("#rv-26-tab-btn-1").click(function () {
        $("#rv-26-tab-pane-1").addClass("active");
        $("#rv-26-tab-pane-2").removeClass("active");
    });
    $("#rv-26-tab-btn-2").click(function () {
        $("#rv-26-tab-pane-2").addClass("active");
        $("#rv-26-tab-pane-1").removeClass("active");
    });

    // service tab option ===============


    // Array of button IDs and corresponding tab IDs
    const buttonTabPairs = [
        { button: "#service-tab-btn-1", tab: "#rv-26-service-tab-1" },
        { button: "#service-tab-btn-2", tab: "#rv-26-service-tab-2" },
        { button: "#service-tab-btn-3", tab: "#rv-26-service-tab-3" },
        { button: "#service-tab-btn-4", tab: "#rv-26-service-tab-4" },
        { button: "#service-tab-btn-5", tab: "#rv-26-service-tab-5" }
    ];

    buttonTabPairs.forEach(pair => {
        $(pair.button).click(function () {
            // Add 'active' class to the clicked button and corresponding tab
            $(pair.button).addClass("active");
            $(pair.tab).addClass("active");

            // Remove 'active' class from all other buttons
            buttonTabPairs.forEach(otherPair => {
                if (otherPair.button !== pair.button) {
                    $(otherPair.button).removeClass("active");
                }
            });

            // Remove 'active' class from all other tabs
            buttonTabPairs.forEach(otherPair => {
                if (otherPair.tab !== pair.tab) {
                    $(otherPair.tab).removeClass("active");
                }
            });
        });
    });


    // for blog ===========
    var rvBlogSlider = new Swiper(".rv-blog-26-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-blog-arrow-btn-right",
            prevEl: ".rv-blog-arrow-btn-left",
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
                spaceBetween: 24,
            }
        },

    });
    // for testimonial
    var rvTestimonialSlider = new Swiper(".rv-26-testimonial-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        freeMode: true,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".rv-26-testimonial-next",
            prevEl: ".rv-26-testimonial-prev",
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
                spaceBetween: 24,
            }
        },

    });



    // progress bar animation


    $('.progres_1').animate({
        width: "93%"
    }, 3000);

    $('.progres_2').animate({
        width: "74%"
    }, 3000);

    $('.progres_3').animate({
        width: "84%"
    }, 3000);


    $('.progress-value').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now) + "%");
            }
        });
    });


    // =====================================================================================

    // ======== for index 27 ==========

    // for menu active class
    $('.rv-27-nav-list li ').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    // search field 
    $('#search-27').click(function () {
        $('#search-field').addClass("active")
    });
    $('.close-btn').click(function () {
        $('#search-field').removeClass("active")
    });

    // swiper for about item service

    var rv27abtSlider = new Swiper(".rv-27-abt-item-swiper-container", {
        slidesPerView: 2,
        spaceBetween: 24,
        loop: true,
        autoplay: true,


        pagination: {

            el: ".rv-27-carousel-indicator",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                spaceBetween: 15,
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            768: {
                spaceBetween: 15,
                slidesPerView: 2,
            },

        },

    });
    // swiper for team 

    var rv27teamSlider = new Swiper(".rv-team-27-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-blog-arrow-btn-right",
            prevEl: ".rv-blog-arrow-btn-left",
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
                spaceBetween: 24,
            }
        },


    });

    // swiper for feature section
    var rv27featureSlider = new Swiper(".rv-27-feature-swiper-container", {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
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

                spaceBetween: 24,
            }
        },


    });

    // swiper for client feedback 

    var rv27feedbackSlider = new Swiper(".rv-27-testimonial__feedback", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        autoplay: true,
        navigation: {
            nextEl: ".rv-27-cf-arrow-btn-right",
            prevEl: ".rv-27-cf-arrow-btn-left",
        },

    });
    // swiper for blog 

    var rv27blogSlider = new Swiper(".rv-27-swiper-blog", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-27-blog-btn-right",
            prevEl: ".rv-27-blog-btn-left",
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
                spaceBetween: 24,
            }
        },

    });

    sr.reveal('.rv-27-about__img', { distance: '60px', origin: 'left' })
    sr.reveal('.rv-27-service__item, .rv-27-testimonial__img', { distance: '60px', origin: 'bottom' })
    sr.reveal('.rv-27-service__img', { distance: '60px', origin: "left" })


    // ==================== For index 28 (index-hospital-1) =================

    // for menu active class
    $('.rv-28-menubar__list li ').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    // about tab option

    $('.rv-28-abt__tabs-item').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    $("#abt-tab-btn-1").click(function () {
        $("#abt-tab-pane-1").addClass("active")
        $("#abt-tab-pane-2").removeClass("active")
    });
    $("#abt-tab-btn-2").click(function () {
        $("#abt-tab-pane-2").addClass("active")
        $("#abt-tab-pane-1").removeClass("active")
    });

    // swiper for project 

    var rv28projectSlider = new Swiper(".rv-28-project-swiper-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-28-project-btn-right",
            prevEl: ".rv-28-project-btn-left",
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
                spaceBetween: 24,
            }
        },


    });

    // swiper for client testimonial
    var rv28testimonialSlider = new Swiper(".rv-28-testimonial-swiper-container", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        autoplay: true,
        navigation: {
            nextEl: ".rv-28-cf-arrow-btn-right",
            prevEl: ".rv-28-cf-arrow-btn-left",
        },
        pagination: {
            el: ".rv-28-testimonial-count",
            type: "fraction",
        },
        breakpoints: {
            0: {
                spaceBetween: 15,
            },
            480: {
                centeredSlides: true,
                spaceBetween: 15,

            },
        }

    });
    // swiper for blog 
    var rv28blogSlider = new Swiper(".rv-28-blog-swiper-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-28-blog-btn-right",
            prevEl: ".rv-28-blog-btn-left",
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
                spaceBetween: 24,
            }
        },
    });

    // scroll reveal
    sr.reveal('.rv-28-service-item , .rv-28-team-member', { interval: 100, delay: 100, distance: '60px', origin: "bottom" });


    // ==============================Index 29 (index-dental-1)  =================================

    // for menu active class
    $('.rv-29-menubar__list li ').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');

    });


    // swiper for team member

    var rv29teamSlider = new Swiper(".rv-29-swiper-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".rv-29-team-controller",
            clickable: true,
            bulletClass: "rv-29-team-bullet",
            bulletActiveClass: "active",
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<i class="fa-solid fa-circle"></i>' + '</span>';
            },
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
                spaceBetween: 24,
            }
        },
    });

    // swiper for testimonial 
    var rv29testimonialSlider = new Swiper(".rv-29-testimonial-swiper-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-29-testimonial-btn-right",
            prevEl: ".rv-29-testimonial-btn-left",
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
                spaceBetween: 24,
            }
        },
    });

    // swiper for blog

    var rv29blogSlider = new Swiper(".rv-29-swiper-blog-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".rv-29-team-controller",
            clickable: true,
            bulletClass: "rv-29-team-bullet",
            bulletActiveClass: "active",
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<i class="fa-solid fa-circle"></i>' + '</span>';
            },
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
                spaceBetween: 24,
            }
        },
    });

    sr.reveal('.rv-29-service-item , .rv-29-abt-item', { interval: 150, delay: 100, distance: '60px', origin: "bottom" })



    // =============================index 30 (index-lab-1)=============================

    // for menu active class
    $('.rv-30-menubar__list li ').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    // swiper for banner
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
    var rv30bannerSlider = new Swiper(".rv-30-swiper-banner-container", {
        slidesPerView: 1,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".rv-30-team-controller",
            clickable: true,
            bulletClass: "rv-30-team-bullet",
            bulletActiveClass: "active",
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<i class="fa-solid fa-circle"></i>' + '</span>';
            },
        },
        on: {
            slideChange: function () {
                textAnimate(this.el);
            }
        },
    });

    // swiper for service 
    var rv30serviceSlider = new Swiper(".rv-30-swiper-service-container", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: true,
        freeMode: true,
        navigation: {
            nextEl: ".rv-30-service-btn-right",
            prevEl: ".rv-30-service-btn-left",
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


    // scroll reveal
    sr.reveal('.rv-30-featured-item, .rv-30-pricing-item , .rv-30-blog-item', { interval: 100, distance: '50px', origin: 'bottom' })

    sr.reveal('.rv-30-featured-img', { origin: 'left' })

    // Check if the filtering class exists
    if (document.querySelector('.filtering')) {
        // If the class exists, initialize mixitup plugin
        var mixer = mixitup('.filtering', {
            animation: {
                effects: 'fade rotateZ(180deg)',
                duration: 800
            }
        });
    }

    // =====================================================================


});
new WOW().init();
new VenoBox({
    selector: ".video__btn"

});

// nice select
$('select').niceSelect();

// Date picker
$(function () {
    $("#datepicker").datepicker({

    });
});
$(function () {
    $("#datepicker-26").datepicker({

    });
});
