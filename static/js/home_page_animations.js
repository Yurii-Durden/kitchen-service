//
// const svgTextMore = document.querySelector('.svg-text-more');
// const initialX = parseFloat(svgTextMore.getAttribute('x'));
// const targetX = initialX - 20;
// const duration = 300; // Тривалість анімації в мілісекундах
// let startTime;
//
// function animate(timestamp) {
//   if (!startTime) startTime = timestamp;
//   const progress = timestamp - startTime;
//   const percentage = Math.min(1, progress / duration);
//   const currentX = initialX + (targetX - initialX) * percentage;
//   svgTextMore.setAttribute('x', currentX);
//
//   if (progress < duration) {
//     requestAnimationFrame(animate);
//   }
// }
//
// function reverseAnimate(timestamp) {
//   if (!startTime) startTime = timestamp;
//   const progress = timestamp - startTime;
//   const percentage = Math.min(1, progress / duration);
//   const currentX = targetX + (initialX - targetX) * percentage;
//   svgTextMore.setAttribute('x', currentX);
//
//   if (progress < duration) {
//     requestAnimationFrame(reverseAnimate);
//   }
// }
//
//   svgTextMore.addEventListener('mouseover', () => {
//     startTime = null;
//     requestAnimationFrame(animate);
//   });
//
//   svgTextMore.addEventListener('mouseout', () => {
//     startTime = null;
//     requestAnimationFrame(reverseAnimate);
//   });

// line_section animation
const line_section_f = document.querySelector(".next-design-inspiration-box-limit")
const line_section_s = document.querySelector(".next-project-description-box-limit")
