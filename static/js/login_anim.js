// button hover
ScrollTrigger.matchMedia({

  "(min-width: 1024px)": function () {
    const loginButton = document.querySelectorAll(".button__anim__elem");

    loginButton.forEach((button) => {
      const letters = Array.from(button.querySelectorAll(".button__fade"));

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

//page load anim
window.addEventListener("DOMContentLoaded", () => {
  const titleLetters = document.querySelectorAll(".title__letter");
  const buttonLetters = document.querySelectorAll(".button__fade");
  const label = document.querySelectorAll("label");
  const input = document.querySelectorAll("input");
  const helpText = document.querySelectorAll(".help__text");

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

  if (label) {
   gsap.to(label, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

  if (input) {
    gsap.to(input, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

  if (helpText) {
    gsap.to(helpText, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

});