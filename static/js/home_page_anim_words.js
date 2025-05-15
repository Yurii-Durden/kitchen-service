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
  "(min-width: 769px)": function () {
    createFadeWordsAnimation({
      words: Array.from(document.querySelectorAll(".fade__text")),
      triggerSelector: ".big__text__box",
      start: "top 90%",
      end: "bottom 20%",
      appearAtFactor: 0.022,
      speed: 10
    });

    createFadeWordsAnimation({
      words: Array.from(document.querySelectorAll(".fade__word__info")),
      triggerSelector: ".numbers__block__info",
      start: "top 80%",
      end: "bottom 10%",
      appearAtFactor: 0.013,
      speed: 9
    });

    createFadeWordsAnimation({
      words: Array.from(document.querySelectorAll(".fade__word__title")),
      triggerSelector: ".title__about__project",
      start: "top bottom",
      end: "bottom 10%",
      appearAtFactor: 0.03,
      speed: 10
    });

    document.querySelectorAll(".anim__letter").forEach(block => {
      createFadeWordsAnimation({
        words: Array.from(block.querySelectorAll(".fade__word__about")),
        triggerSelector: block,
        start: "top 90%",
        end: "bottom 10%",
        appearAtFactor: 0.020,
        speed: 8
      });
    });
  }
});

function createFadeWordsAnimation({
  words,
  triggerSelector,
  start = "top bottom",
  end = "bottom top",
  appearAtFactor = 0.02,
  speed = 10,
}) {
  ScrollTrigger.create({
    trigger: typeof triggerSelector === "string" ? document.querySelector(triggerSelector) : triggerSelector,
    start,
    end,
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;

      words.forEach((word, i) => {
        const appearAt = i * appearAtFactor;
        const wordProgress = (progress - appearAt) * speed;
        const clamped = Math.min(Math.max(wordProgress, 0), 1);

        word.style.opacity = clamped;
        word.style.filter = `blur(${(1 - clamped) * 10}px)`;
        word.style.transform = `translate3d(${(1 - clamped) * 10}px, 0, 0)`;
      });
    }
  });
}
