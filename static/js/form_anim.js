//page load anim
window.addEventListener("DOMContentLoaded", () => {

  const titleLetters = document.querySelectorAll(".title__letter");
  const buttonLetters = document.querySelectorAll(".another__letter");
  const inputText = document.querySelectorAll(".dish__type__name__input");

  gsap.to(titleLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.09,
    delay: 0.1
  });
  gsap.to(buttonLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.3
  });
  gsap.to(inputText, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.3
  });
});

//button hover
ScrollTrigger.matchMedia({

  "(min-width: 1024px)": function () {
    const updateCreateButton = document.querySelectorAll(".form__button");

    updateCreateButton.forEach((button) => {
      const letters = Array.from(button.querySelectorAll(".another__letter"));

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
  }

});