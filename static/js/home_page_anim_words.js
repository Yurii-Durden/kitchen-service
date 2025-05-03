const vision_section = document.querySelector(".vision__section");

ScrollTrigger.create({
  trigger: vision_section,
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;
    let maxWidth =
        window.innerWidth <= 600 ? 10 :
        window.innerWidth <= 855 ? 30 : 45;
    updateTextWidth(progress, 9, maxWidth);
  }
});

function updateTextWidth(progress, speedFactor = 0.7, maxWidth = 45, delayProgress = 0.1) {
  const words = document.querySelectorAll(".ani-t");

  let adjustedProgress = (progress - delayProgress) / (1 - delayProgress);
  adjustedProgress = Math.max(0, adjustedProgress);
  adjustedProgress = Math.min(1, adjustedProgress);

  const newWidth = Math.min(maxWidth, speedFactor * adjustedProgress * maxWidth);

  words.forEach(word => {
    word.style.width = `${newWidth}px`;
  });
}

// ScrollTrigger.create({
//     trigger: document.querySelector(".statistic__restaurant__box"),
//     start: "top 90%",
//     end: "bottom top",
//     scrub: true,
//     onUpdate: self => {
//       const progress = self.progress;
//       animateWords(progress, document.querySelector(".hide__word__f"));
//     }
// });

// ScrollTrigger.create({
//     trigger: document.querySelector(".structure__info__box"),
//     start: "top 90%",
//     end: "bottom top",
//     scrub: true,
//     onUpdate: self => {
//       const progress = self.progress;
//       animateWords(progress, document.querySelector(".hide__word__s"));
//     }
// });

ScrollTrigger.create({
    trigger: document.querySelector(".abilities__info__box"),
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;
      animateWords(progress, document.querySelector(".hide__word__t"));
    }
});

ScrollTrigger.create({
    trigger: document.querySelector(".vision__section__philosophy"),
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;
      animateWords(progress, document.querySelector(".hide__word__vision_f"));
    }
});

ScrollTrigger.create({
    trigger: document.querySelector(".vision__section__environment"),
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;
      animateWords(progress, document.querySelector(".hide__word__vision_s"));
    }
});

function animateWords(progress, title) {
  const speedFactor = 2;
  let adjustedProgress = Math.min(1, Math.max(0, progress * speedFactor));
  console.log(progress)

  const translateY = (1 - adjustedProgress) * 100;
  title.style.transform = `translateY(${translateY}%)`;
}

