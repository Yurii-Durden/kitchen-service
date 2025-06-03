gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content'
});

window.addEventListener("DOMContentLoaded", () => {
  const headerLetters = document.querySelectorAll(".fade__header");

  gsap.to(headerLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 1.05
  });

});

const header_menu_button = document.querySelector(".menu__item");
const header_menu = document.querySelector(".header__menu");
const nav_links = Array.from(document.querySelectorAll(".menu__fade"));
const body = document.body;

let menuIsOpen = false;

header_menu_button.addEventListener("click", (event) => {
  event.stopPropagation();
  body.classList.toggle("hide__scroll");

  if (!menuIsOpen) {
    header_menu.classList.add("header__menu__active");
    gsap.to(nav_links, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 0.9,
      stagger: 0.02,
      ease: "power3.out",
      delay: 0.3
    });
  } else {
    gsap.to(nav_links, {
      opacity: 0,
      x: 20,
      filter: "blur(10px)",
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in"
    });
    setTimeout(() => {header_menu.classList.remove("header__menu__active");}, 100);
  }

  menuIsOpen = !menuIsOpen;
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

const menuBox = document.querySelector(".menu__box");
let toggled = false;

menuBox.addEventListener("click", () => {
  const menuLetters = Array.from(document.querySelectorAll(".fade__menu"));
  const closeLetters = Array.from(document.querySelectorAll(".fade__close"));

  const duration = 0.9;
  const stagger = 0.03;
  const ease = "power2.out";

  const tl = gsap.timeline();

  if (!toggled) {
    tl.to([...menuLetters].reverse(), {
      opacity: 0,
      x: 15,
      filter: "blur(5px)",
      duration,
      ease,
      stagger,
    }, 0);

    tl.to([...closeLetters].reverse(), {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration,
      ease,
      stagger,
    }, 0.1);

  } else {
    tl.to(menuLetters, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration,
      ease,
      stagger: 0.09,
    }, 0.1);

    tl.to(closeLetters, {
      opacity: 0,
      x: -15,
      filter: "blur(5px)",
      duration,
      ease,
      stagger,
    }, 0);
  }

  toggled = !toggled;
});


const loginBoxes = document.querySelectorAll(".login__item");

loginBoxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    const logLetters = Array.from(box.querySelectorAll(".fade__link"));
    const tl = gsap.timeline();

    tl.to(logLetters, {
      opacity: 0,
      x: 15,
      filter: "blur(5px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.04,
    }, 0);
  });

  box.addEventListener("mouseleave", () => {
    const logLetters = Array.from(box.querySelectorAll(".fade__link"));
    const tl = gsap.timeline();

    tl.to(logLetters, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.04,
    }, 0);
  });
});

