gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content'
});

// ScrollTrigger.create({
//   trigger: document.querySelector(".footer__about__info"),
//   start: "top bottom",
//   end: "bottom top",
//   scrub: true,
//   onUpdate: self => {
//     const progress = self.progress;
//     const word = document.querySelectorAll(".about__title .about__letter");
//     takeLetters(progress, word);
//   }
// });
//
// ScrollTrigger.create({
//   trigger: document.querySelector(".footer__about__art"),
//   start: "top bottom",
//   end: "bottom top",
//   scrub: true,
//   onUpdate: self => {
//     const progress = self.progress;
//     const word = document.querySelectorAll(".art__title .art__letter");
//     takeLetters(progress, word);
//   }
// });
//
// function takeLetters(progress, word) {
//   const letters = word;
//   const speedFactor = 3;
//
//   letters.forEach((letter) => {
//
//     let localProgress = Math.min(1, Math.max(0, progress));
//     localProgress = Math.min(1, Math.max(0, localProgress * speedFactor));
//
//     const translateX = (1 - localProgress) * -100;
//     letter.style.transform = `translateX(${translateX}%)`;
//   });
// }
//
//
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
