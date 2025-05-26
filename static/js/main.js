gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content'
});

const header_menu_button = document.querySelector(".menu__item");
const header_menu = document.querySelector(".header__menu");
const menu__line__f = document.querySelector(".menu__line__f");
const menu__line__s = document.querySelector(".menu__line__s");
const body = document.body;

header_menu_button.addEventListener("click", (event) => {
  event.stopPropagation();
  header_menu.classList.toggle("header__menu__active");
  menu__line__f.classList.toggle("menu__line__f__active");
  menu__line__s.classList.toggle("menu__line__s__active");
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

const menuBox = document.querySelector(".menu__box");
let toggled = false;

menuBox.addEventListener("click", () => {
  const menuLetters = Array.from(document.querySelectorAll(".fade__menu"));
  const closeLetters = Array.from(document.querySelectorAll(".fade__close"));

  if (!toggled) {
    const tl = gsap.timeline();

    tl.to([...menuLetters].reverse(), {
      opacity: 0,
      x: 15,
      filter: "blur(5px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.05,
    }, 0);

    tl.to([...closeLetters].reverse(), {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.05,
    }, 0.1);

    tl.to([...closeLetters].reverse(), {
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.05,
    }, 0.1);

  } else {
    const tl = gsap.timeline();

    tl.to(menuLetters, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.09
    }, 0.1);

    tl.to(closeLetters, {
      opacity: 0,
      x: -15,
      duration: 1,
      ease: "power2.out",
      stagger: 0.05,
    }, 0);

    tl.to(closeLetters, {
      filter: "blur(5px)",
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.05,
    }, 0);
  }

  toggled = !toggled;
});


