gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
	wrapper: '.wrapper',
	content: '.content'
})


const header_menu_button = document.querySelector(".menu__item");
const header_menu = document.querySelector(".header__menu");
const menu_click_elem = document.querySelector(".menu__click__elem");
const menu_line_f = document.querySelector(".menu__line__first");
const menu_line_s = document.querySelector(".menu__line__second");
const body = document.body;

header_menu_button.addEventListener("click", (event) => {
	event.stopPropagation();
    header_menu.classList.toggle("header__menu__active");
	menu_click_elem.classList.toggle("menu__button__active");
	menu_line_f.classList.toggle("menu__line__active__first");
    menu_line_s.classList.toggle("menu__line__active__second");

	body.classList.toggle("hide__scroll");
});

let lastScroll = 0;
const header = document.querySelector('.header');
const firstSection = document.querySelector('.first__section');

const smoother = ScrollSmoother.get();
const scroller = smoother.scrollTrigger.scroller;

scroller.addEventListener('scroll', () => {
  const scrollTop = smoother.scrollTop();
  const firstSectionTop = firstSection.getBoundingClientRect().top;

  // Якщо перша секція біля самого верху — завжди показуємо хедер
  if (firstSectionTop <= 0 && firstSectionTop >= -50) {
    header.style.transform = 'translateY(0)';
  } else if (scrollTop > lastScroll + 5) {
    header.style.transform = 'translateY(-100%)'; // сховати
  } else if (scrollTop < lastScroll - 5) {
    header.style.transform = 'translateY(0)'; // показати
  }
  console.log(firstSectionTop)
  lastScroll = scrollTop;
});