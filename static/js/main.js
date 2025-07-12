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
    delay: 1
  });
});


const header_menu_button = document.querySelector(".menu__item");
const header_menu = document.querySelector(".header__menu");
const nav_links = Array.from(document.querySelectorAll(".menu__fade"));
const body = document.body;

let menuIsOpen = false;

header_menu_button.addEventListener("click", (event) => {
  event.stopPropagation();

  if (!menuIsOpen) {
    body.classList.add("hide__scroll");
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
    setTimeout(() => {body.classList.remove("hide__scroll");}, 1200)
    setTimeout(() => {header_menu.classList.remove("header__menu__active");}, 100);
  }

  menuIsOpen = !menuIsOpen;
});


let lastScroll = 0;
const header = document.querySelector('.header');
const firstSection = document.querySelector('.first__section');

if (firstSection) {
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
}


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


//cursor
const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

if (isMobile) {
  document.body.classList.add("mobile"); //
} else {
  const cursor = document.getElementById("cursor");

  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    posX += (mouseX - posX) * 0.20;
    posY += (mouseY - posY) * 0.20;

    gsap.set(cursor, {
      x: posX,
      y: posY
    });
  });
}


//cursor hover
function initCursorHoverEffects() {
  const scaleTargets = [
    ".hover__elem",
    ".dish__group__cook label",
    "input",
    "textarea"
  ];

  scaleTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(elem => {
      if (!elem.dataset.cursorBound) {
        elem.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale: 0.6, duration: 0.31, ease: "power2.out" });
        });
        elem.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 1, duration: 0.31, ease: "power2.out" });
        });
        elem.dataset.cursorBound = "true";
      }
    });
  });

  document.querySelectorAll(".hover__list").forEach(elem => {
    if (!elem.dataset.cursorBound) {
      elem.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor__list__hover");
      });
      elem.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor__list__hover");
      });
      elem.dataset.cursorBound = "true";
    }
  });

  document.querySelectorAll("img").forEach(img => {
    if (!img.dataset.cursorBound) {
      img.addEventListener("mouseenter", () => {
        gsap.to(cursor, { opacity: 0.3, duration: 0.3, ease: "power2.out" });
      });
      img.addEventListener("mouseleave", () => {
        gsap.to(cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
      });
      img.dataset.cursorBound = "true";
    }
  });
}

initCursorHoverEffects();
