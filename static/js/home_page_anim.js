ScrollTrigger.matchMedia({
  "(min-width: 1257px)": function () {
    const animations = [
      {
        elements: ".fade__text",
        trigger: ".big__text__box"
      },
      {
        elements: ".fade__word__info",
        trigger: ".numbers__block__info"
      },
      {
        elements: ".fade__word__title",
        trigger: ".title__about__project"
      },
      {
        elements: ".fade__word__about",
        trigger: ".anim__letter"
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
          duration: 1,
          stagger: 0.09,
          scrollTrigger: {
            trigger: triggerEl,
            start: "top bottom-=15%",
            end: "bottom center+=15%",
            scrub: true,
          }
        });
      });
    });

    ScrollTrigger.refresh();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const sereneLetters = document.querySelectorAll(".fade__serene");
  const eliseText = document.querySelectorAll(".elise");

  gsap.to(sereneLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.09,
    delay: 0.1
  });

  gsap.to(eliseText, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.2,
    delay: 0.7
  });
});
