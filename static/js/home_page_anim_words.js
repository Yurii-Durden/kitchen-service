// document.querySelectorAll(".anim__letter").forEach(textBlock => {
//   const letters = textBlock.querySelectorAll(".letter");
//
//   ScrollTrigger.create({
//     trigger: textBlock,
//     start: "top bottom",
//     end: "bottom top",
//     scrub: true,
//     onUpdate: self => {
//       const progress = self.progress;
//       takeLetters(progress, letters);
//     }
//   });
// });
//
// function takeLetters(progress, letters) {
//   const speedFactor = 3;
//
//   letters.forEach(letter => {
//     let localProgress = Math.min(1, Math.max(0, progress));
//     localProgress = Math.min(1, Math.max(0, localProgress * speedFactor));
//
//     const translateX = (1 - localProgress) * -100;
//     letter.style.transform = `translateX(${translateX}%)`;
//   });
// }
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
          stagger: 0.1,
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
