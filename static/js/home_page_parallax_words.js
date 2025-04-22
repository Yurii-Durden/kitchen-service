const vision_section = document.querySelector(".vision-section");
const img_vision = document.querySelector(".vision-image");

const second_section = document.querySelector(".second_section");
const third_section = document.querySelector(".third_section");
const restaurant_image = document.querySelector(".img-restaurant");
const img_kitchen = document.querySelector(".img-kitchen");

ScrollTrigger.create({
  trigger: vision_section,
  start: "top bottom",
  end: "bottom top",
  onUpdate: self => {
    const progress = self.progress;
    updateImagePosition(img_vision, progress, 150, 220);
    updateTextWidth(progress, 4, 45);
  }
});

ScrollTrigger.create({
  trigger: second_section,
  start: "top bottom",
  end: "bottom top",
  onUpdate: self => {
    const progress = self.progress;
    updateImagePosition(restaurant_image, progress, 150, 220);
  }
});

ScrollTrigger.create({
  trigger: third_section,
  start: "top bottom",
  end: "bottom top",
  onUpdate: self => {
    const progress = self.progress;
    updateImagePosition(img_kitchen, progress, 150, 220);
  }
});

function updateImagePosition(img, progress, startPos = 150, moveUpSpeed = 220) {
  if (!img) return;
  const newPos = startPos - (progress * moveUpSpeed);
  img.style.objectPosition = `center ${newPos}%`;
}

function updateTextWidth(progress, speedFactor = 0.7, maxWidth = 45) {
  const words = document.querySelectorAll(".ani-t");
  const newWidth = Math.min(maxWidth, speedFactor * progress * maxWidth);

  words.forEach(word => {
    word.style.width = `${newWidth}px`;
  });
}
