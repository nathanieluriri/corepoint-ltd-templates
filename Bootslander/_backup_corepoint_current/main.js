/**
* Template Name: Bootslander
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Services screens
   */
  function initServicesStory() {
    const servicesStory = document.querySelector('.services-story');
    if (!servicesStory) return;

    const screens = Array.from(servicesStory.querySelectorAll('.service-screen'));
    const desktopQuery = window.matchMedia('(min-width: 992px)');
    let observer = null;
    let activeStepId = screens[0]?.dataset.step || null;

    function setVisibleScreen(stepId) {
      if (!stepId || stepId === activeStepId) return;
      activeStepId = stepId;

      screens.forEach((screen) => {
        screen.classList.toggle('is-visible', screen.dataset.step === stepId);
      });
    }

    function destroyObserver() {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }

    function bindObserver() {
      destroyObserver();
      activeStepId = null;
      setVisibleScreen(screens[0]?.dataset.step);

      if (!desktopQuery.matches || !('IntersectionObserver' in window)) {
        screens.forEach((screen) => screen.classList.add('is-visible'));
        return;
      }

      screens.forEach((screen, index) => {
        screen.classList.toggle('is-visible', index === 0);
      });

      observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

        if (!visibleEntries.length) return;

        setVisibleScreen(visibleEntries[0].target.dataset.step);
      }, {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: '-18% 0px -18% 0px'
      });

      screens.forEach((screen) => observer.observe(screen));
    }

    bindObserver();
    window.addEventListener('resize', bindObserver);
  }
  window.addEventListener('load', initServicesStory);

  /**
   * Leadership dark panels
   */
  function initLeadershipStory() {
    const leadershipStory = document.querySelector('.leadership-dark-story');
    if (!leadershipStory) return;

    const panels = Array.from(leadershipStory.querySelectorAll('.leadership-dark-panel'));
    const desktopQuery = window.matchMedia('(min-width: 992px)');
    let observer = null;
    let activePanelId = panels[0]?.dataset.step || null;

    function setVisiblePanel(stepId) {
      if (!stepId || stepId === activePanelId) return;
      activePanelId = stepId;

      panels.forEach((panel) => {
        panel.classList.toggle('is-visible', panel.dataset.step === stepId);
      });
    }

    function destroyObserver() {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }

    function bindObserver() {
      destroyObserver();
      activePanelId = null;
      setVisiblePanel(panels[0]?.dataset.step);

      if (!desktopQuery.matches || !('IntersectionObserver' in window)) {
        panels.forEach((panel) => panel.classList.add('is-visible'));
        return;
      }

      panels.forEach((panel, index) => {
        panel.classList.toggle('is-visible', index === 0);
      });

      observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

        if (!visibleEntries.length) return;

        setVisiblePanel(visibleEntries[0].target.dataset.step);
      }, {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: '-18% 0px -18% 0px'
      });

      panels.forEach((panel) => observer.observe(panel));
    }

    bindObserver();
    window.addEventListener('resize', bindObserver);
  }
  window.addEventListener('load', initLeadershipStory);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
