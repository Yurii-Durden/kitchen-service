gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content'
});

const header_menu_button = document.querySelector(".menu__item");
const header_menu = document.querySelector(".header__menu");
const menu_click_elem = document.querySelector(".menu__click__elem");
const body = document.body;

header_menu_button.addEventListener("click", (event) => {
  event.stopPropagation();
  header_menu.classList.toggle("header__menu__active");
  menu_click_elem.classList.toggle("menu__button__active");
  body.classList.toggle("hide__scroll");
});

let lastScroll = 0;
const header = document.querySelector('.header');
const firstSection = document.querySelector('.first__section');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const firstSectionTop = firstSection.getBoundingClientRect().top;

  if (firstSectionTop <= 0 && firstSectionTop >= -50) {
    header.style.transform = 'translateY(0)';
  } else if (scrollTop > lastScroll + 5) {
    header.style.transform = 'translateY(-100%)';
  } else if (scrollTop < lastScroll - 5) {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = scrollTop;
});

ScrollTrigger.matchMedia({
  "(min-width: 1257px)": function () {
    const animations = [
      {
        elements: ".fade__word__foot",
        trigger: ".footer__text"
      },
    ];

    animations.forEach(({ elements, trigger }) => {
      const triggerElements = document.querySelectorAll(trigger);
      if (!triggerElements.length) return;

      triggerElements.forEach(triggerEl => {
        const targets = triggerEl.querySelectorAll(elements);
        if (!targets.length) return;

        gsap.fromTo(targets, {
          opacity: 0,
          x: 15,
          filter: "blur(10px)"
        }, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 1.2,
          stagger: 0.1,
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 50%",
            end: "bottom center+=30%",
            scrub: true,
          }
        });
      });
    });

    ScrollTrigger.refresh();
  }
});
