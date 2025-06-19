//update delete buttons hover
const updateDeleteButtons = document.querySelectorAll(".delete__update__button");

updateDeleteButtons.forEach((button) => {
  const letters = Array.from(button.querySelectorAll(".anim__button"));

  button.addEventListener("mouseenter", () => {
    const tl = gsap.timeline();
    tl.to(letters, {
      opacity: 0,
      x: 15,
      filter: "blur(5px)",
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.05,
    });
  });

  button.addEventListener("mouseleave", () => {
    const tl = gsap.timeline();
    tl.to(letters, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.05,
    });
  });
});

//page load anim
window.addEventListener("DOMContentLoaded", () => {
  const titleAnimItems = document.querySelectorAll(".title__anim__item");
  const loadAnimItems = document.querySelectorAll(".load__anim__item");
  const loadAnimButton = document.querySelectorAll(".anim__button");

  gsap.to(titleAnimItems, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.09,
    delay: 0.1
  });

  gsap.to(loadAnimItems, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.5
  });

  gsap.to(loadAnimButton, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.7
  });
});

const paginationButtons = document.querySelectorAll(".page__link");

if (paginationButtons.length > 0) {

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
}

