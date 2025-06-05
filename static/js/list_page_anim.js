//page load anim
window.addEventListener("DOMContentLoaded", () => {
  const titleAllLetters = document.querySelectorAll(".fade__title__all");
  const searchForm = document.querySelector(".search__form");
  // const paginationLetters = document.querySelectorAll(".fade__pag");

  gsap.to(titleAllLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.09,
    delay: 0.1
  });

  gsap.to(searchForm, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.5
  });

  gsap.to(buttonLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.5
  });

  // gsap.to(paginationLetters, {
  //   opacity: 1,
  //   x: 0,
  //   filter: "blur(0px)",
  //   duration: 1.2,
  //   ease: "power2.out",
  //   stagger: 0.01,
  //   delay: 0.8
  // });
});

//hover
const createButton = document.querySelector(".create__button");
const buttonLetters = Array.from(document.querySelectorAll(".create__fade"));

createButton.addEventListener("mouseenter", () => {
  const tl = gsap.timeline();

  tl.to(buttonLetters, {
    opacity: 0,
    x: 15,
    filter: "blur(5px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.04,
  }, 0);
});

createButton.addEventListener("mouseleave", () => {
  const tl = gsap.timeline();

  tl.to(buttonLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.03,
  }, 0);
});

const paginationButtons = document.querySelectorAll(".page__link");

paginationButtons.forEach((box) => {
  const paginationLetters = Array.from(box.querySelectorAll(".fade__p"));

  box.addEventListener("mouseenter", () => {
    const tl = gsap.timeline();

    tl.to([...paginationLetters].reverse(), {
      opacity: 0,
      x: 15,
      filter: "blur(5px)",
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.1,
    }, 0);
  });

  box.addEventListener("mouseleave", () => {
    const tl = gsap.timeline();

    tl.to(paginationLetters, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    }, 0);
  });
});

//search form
const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() !== "") {
    searchForm.classList.add("search__form--filled");
  } else {
    searchForm.classList.remove("search__form--filled");
  }
});
