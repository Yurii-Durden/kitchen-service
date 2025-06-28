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

//select list
const selectButton     = document.querySelector(".select__list__button");
const selectList       = document.querySelector(".dish__type__list");
const selectListItems  = document.querySelectorAll(".dish__type__item");
const checkedElem      = document.querySelector(".selected__text");
const toOpacity = document.querySelectorAll(".to__opacity");

if(selectButton) {
  selectButton.addEventListener("click", (e) => {
    e.stopPropagation();
    selectList.classList.toggle("dish__type__list__active");
    toOpacity.forEach((elem) => {
      elem.classList.toggle("to__opacity__active");
    })
  });

  selectListItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      checkedElem.innerText = item.innerText;
    });
  });

  document.addEventListener("click", (e) => {
    const outsideButton = !selectButton.contains(e.target);
    const outsideList   = !selectList.contains(e.target);

    if (outsideButton && outsideList) {
      selectList.classList.remove("dish__type__list__active");
      toOpacity.forEach((elem) => {
        elem.classList.remove("to__opacity__active");
    })

    }
  });
}

//page load anim
window.addEventListener("DOMContentLoaded", () => {

  const titleLetters = document.querySelectorAll(".title__letter");
  const buttonLetters = document.querySelectorAll(".another__letter");
  const inputText = document.querySelectorAll(".form_input");
  const experience = document.querySelector(".years_of_experience_input");
  const isChef = document.querySelector(".is_chef_input");
  const checkElem = document.querySelector(".checked__elem");
  const cooksMulti = document.querySelectorAll(".dish__group__cook label");
  const errors = document.querySelectorAll(".error__item");

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

  if (experience) {
      gsap.to(experience, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.01,
        delay: 0.3
      });
  }

  if (isChef) {
    gsap.to(isChef, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

  if (checkElem) {
    gsap.to(checkElem, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }
  if (errors.length > 0) {
    gsap.to(errors, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

  if (cooksMulti.length > 0) {
    gsap.to(cooksMulti, {
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
