ScrollTrigger.matchMedia({
  "(min-width: 1257px)": function () {
    const animations = [
      {
        elements: ".fade__what",
        trigger: ".what__title"
      },
      {
        elements: ".fade__what__text",
        trigger: ".what__text"
      },
      {
        elements: ".fade__contact",
        trigger: ".contacts__title"
      },
    ];

    animations.forEach(({ elements, trigger }) => {
      const targets = document.querySelectorAll(elements);
      const triggerElement = document.querySelector(trigger);
      if (!targets.length || !triggerElement) return;

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
        stagger: 0.1,
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom-=15%",
          end: "bottom center+=15%",
          scrub: true,
        }
      });
    });

    ScrollTrigger.refresh();
  }
});

ScrollTrigger.matchMedia({
  "(min-width: 1257px)": function () {
    const animations = [
      {
        elements: ".fade__say__hi",
        trigger: ".say_hi_text",
      },
    ];

    animations.forEach(({ elements, trigger }) => {
      const targets = document.querySelectorAll(elements);
      const triggerElement = document.querySelector(trigger);
      if (!targets.length || !triggerElement) return;

      gsap.fromTo(targets, {
        opacity: 0,
        y: "30%",
        filter: "blur(25px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 80%",
          end: "bottom center+=5%",
          scrub: true,
        }
      });
    });

    ScrollTrigger.refresh();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const titleLetters = document.querySelectorAll(".fade__about__title");
  const aboutWords = document.querySelectorAll(".fade__about");

  gsap.to(titleLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    delay: 0.1
  });

  gsap.to(aboutWords, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.2
  });
});

