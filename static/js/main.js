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

const words_footer = Array.from(document.querySelectorAll(".fade__word__foot"));

ScrollTrigger.create({
  trigger: ".footer__text",
  start: "top 45%",
  end: "bottom top+=200",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;

    words_footer.forEach((word, i) => {
      const appearAt = i * 0.013;
      const wordProgress = (progress - appearAt) * 10;
      const clamped = Math.min(Math.max(wordProgress, 0), 1);

      word.style.opacity = clamped;
      word.style.filter = `blur(${(1 - clamped) * 10}px)`;
      word.style.transform = `translate3d(${(1 - clamped) * 10}px, 0, 0)`;
    });
  }
});
