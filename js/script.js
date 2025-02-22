(function($) {

    "use strict";
    

    $(function() {
      AOS.init();
      });        
   


    $(document).ready(function() {
      
      // masonoary //

      initIsotope();
  
    
      // lightbox

      lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fitImagesInViewport': true
      })
      
      /* swiper */
      

      var testimonialSwiper = new Swiper(".testimonial-swiper", {
        spaceBetween: 20,
        pagination: {
            el: ".testimonial-swiper-pagination",
            clickable: true,
          },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 3,
          }
        },
      });

      var workswiper = new Swiper(".work-swiper", {
        spaceBetween: 20,
        pagination: {
            el: ".work-swiper-pagination",
            clickable: true,
          },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 1,
          },
          1400: {
            slidesPerView: 1,
          }
        },
      });

    }); // End of a document ready

    var aboutswiper = new Swiper('.about-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      simulateTouch: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
  });
  

  var signatureSwiper = new Swiper('.signature-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
      nextEl: '.signature-next',
      prevEl: '.signature-prev',
    },
    loop: true, // Enable looping of slides
});


// Initialize Swiper for Local
var localSwiper = new Swiper('.local-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay : true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
      nextEl: '.local-next',
      prevEl: '.local-prev',
    },
    loop: true, // Enable looping of slides
});

var subscribtionSwiper = new Swiper('.subscription-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay : true,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
    nextEl: '.subs-next',
    prevEl: '.subs-prev',
  },
  loop: true, // Enable looping of slides
});

var styleSwiper = new Swiper('.styling-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay : true,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
    nextEl: '.style-next',
    prevEl: '.style-prev',
  },
  loop: true, // Enable looping of slides
});

const backgroundSwiper = new Swiper('.background-swiper', {
  loop: true, // Infinite looping
  autoplay: {
      delay: 5000, // Auto-slide every 5 seconds
  },
  navigation: {
      nextEl: '.background-next',
      prevEl: '.background-prev',
  },
});


  // init Isotope
  var initIsotope = function() {
    
    $('.grid').each(function(){

      // $('.grid').imagesLoaded( function() {
        // images have loaded
        var $buttonGroup = $( '.button-group' );
        var $checked = $buttonGroup.find('.is-checked');
        var filterValue = $checked.attr('data-filter');
  
        var $grid = $('.grid').isotope({
          itemSelector: '.portfolio-item',
          // layoutMode: 'fitRows',
          filter: filterValue
        });
    
        // bind filter button click
        $('.button-group').on( 'click', 'a', function(e) {
          e.preventDefault();
          filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
    
        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
          $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      // });

    });
  }



})(jQuery);


(function(html) {

  'use strict';
 

  const cfg = {
      
      // MailChimp URL
      mailChimpURL : 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6' 

  };

  const ssPreloader = function() {
    const siteBody = document.querySelector('body');
    const preloader = document.querySelector('#preloader');
    const html = document.querySelector('html'); // Add this to select html if not defined
    if (!preloader) return;

    html.classList.add('ss-preload');

    // Set the delay for the preloader in milliseconds (e.g., 3000 for 3 seconds)
    const preloaderDelay = 1000; // 3 seconds

    window.addEventListener('load', function() {
        setTimeout(() => {  // Add a timer for preloader
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        }, preloaderDelay); // Set the delay time for the preloader to disappear
    });

    window.addEventListener('beforeunload', function() {
        siteBody.classList.remove('ss-show');
    });
}; // end ssPreloader

 
 /* move header
    * -------------------------------------------------- */
 const ssMoveHeader = function () {

  const hdr = document.querySelector('.s-header');
  const hero = document.querySelector('#intro');
  let triggerHeight;

  if (!(hdr && hero)) return;

  setTimeout(function() {
      triggerHeight = hero.offsetHeight - 170;
  }, 300);

  window.addEventListener('scroll', function () {

      let loc = window.scrollY;

      if (loc > triggerHeight) {
          hdr.classList.add('sticky');
      } else {
          hdr.classList.remove('sticky');
      }

      if (loc > triggerHeight + 20) {
          hdr.classList.add('offset');
      } else {
          hdr.classList.remove('offset');
      }

      if (loc > triggerHeight + 150) {
          hdr.classList.add('scrolling');
      } else {
          hdr.classList.remove('scrolling');
      }

  });

}; // end ssMoveHeader


/* mobile menu
* ---------------------------------------------------- */ 
const ssMobileMenu = function() {

  const toggleButton = document.querySelector('.s-header__menu-toggle');
  const mainNavWrap = document.querySelector('.s-header__nav');
  const siteBody = document.querySelector('body');

  if (!(toggleButton && mainNavWrap)) return;

  toggleButton.addEventListener('click', function(e) {
      e.preventDefault();
      toggleButton.classList.toggle('is-clicked');
      siteBody.classList.toggle('menu-is-open');
  });

  mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

      link.addEventListener("click", function(event) {

          // at 900px and below
          if (window.matchMedia('(max-width: 900px)').matches) {
              toggleButton.classList.toggle('is-clicked');
              siteBody.classList.toggle('menu-is-open');
          }
      });
  });

  window.addEventListener('resize', function() {

      // above 900px
      if (window.matchMedia('(min-width: 901px)').matches) {
          if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
          if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
      }
  });

}; // end ssMobileMenu


  /* highlight active menu link on pagescroll
  * ------------------------------------------------------ */
  const ssScrollSpy = function() {

      const sections = document.querySelectorAll('.target-section');

      // Add an event listener listening for scroll
      window.addEventListener('scroll', navHighlight);

      function navHighlight() {
      
          // Get current scroll position
          let scrollY = window.pageYOffset;
      
          // Loop through sections to get height(including padding and border), 
          // top and ID values for each
          sections.forEach(function(current) {
              const sectionHeight = current.offsetHeight;
              const sectionTop = current.offsetTop - 50;
              const sectionId = current.getAttribute('id');
        
              if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                  document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
              } else {
                  document.querySelector('.s-header__nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
              }
          });
      }

  }; // end ssScrollSpy


 /* Initialize
  * ------------------------------------------------------ */
  (function ssInit() {

      ssPreloader();
      ssMoveHeader();
      ssMobileMenu();
      ssScrollSpy();
      ssSwiper();
      ssMailChimpForm();
      ssVideoLightbox();
      ssAlertBoxes();
      ssBackToTop();
      ssMoveTo();

  })();

})(document.documentElement);

document.getElementById('emailForm').addEventListener('submit', function(event) {
  var emailInput = document.getElementById('emailInput');
  if (!emailInput.value.includes('@')) {
      emailInput.setCustomValidity('Please include an "@" in the email address.');
  } else {
      emailInput.setCustomValidity(''); // Clear custom error message if valid
  }
});