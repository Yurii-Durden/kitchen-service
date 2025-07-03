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

//INGREDIENTS START
//select type
const selectButton     = document.querySelector(".select__list__button");
const selectList       = document.querySelector(".dish__type__list");
const selectListItems  = document.querySelectorAll(".dish__type__item");
const checkedElem      = document.querySelector(".selected__text");
const toOpacity = document.querySelectorAll(".to__opacity");
const unitBox = document.querySelectorAll(".unit__wrapper");
const ingBox = document.querySelectorAll(".ing__wrapper");

if(selectButton) {
  selectButton.addEventListener("click", (e) => {
    e.stopPropagation();
    selectList.classList.toggle("dish__type__list__active");
    toOpacity.forEach((elem) => {
      elem.classList.toggle("to__opacity__active");
    })
    unitBox.forEach((elem) => {
      elem.classList.toggle("unit__opa");
    })
    ingBox.forEach((elem) => {
      elem.classList.toggle("to__ing__opacity");
    })
  });

  selectListItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      checkedElem.innerText = item.innerText;
      selectList.classList.remove("dish__type__list__active");
      toOpacity.forEach((elem) => {
        elem.classList.remove("to__opacity__active");
      })
      unitBox.forEach((elem) => {
        elem.classList.remove("unit__opa");
      })
      ingBox.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      })
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
      unitBox.forEach((elem) => {
        elem.classList.remove("unit__opa");
      })
      ingBox.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      })
    }
  });
}

//select ingredient
const selectIngButton     = document.querySelector(".choose__ing__button");
const selectIngList       = document.querySelector(".ing__list");
const selectIngItems  = document.querySelectorAll(".ing__list li");
const checkedIng      = document.querySelector(".selected__ing");
const toOpacityTypes = document.querySelector(".to__opacity__types");

if(selectIngButton) {
  selectIngButton.addEventListener("click", (e) => {
    e.stopPropagation();
    selectIngList.classList.toggle("dish__ing__list__active");
    toOpacityTypes.classList.toggle("to__ing__opacity");
    toOpacity.forEach((elem) => {
      elem.classList.toggle("to__ing__opacity");
    })
    unitBox.forEach((elem) => {
      elem.classList.toggle("unit__opa");
    })
  });

  selectIngItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      checkedIng.innerText = item.innerText;
      selectIngList.classList.remove("dish__ing__list__active");
      toOpacity.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      })
      toOpacityTypes.classList.remove("to__ing__opacity");
      unitBox.forEach((elem) => {
        elem.classList.remove("unit__opa");
      })
    });
  });

  document.addEventListener("click", (e) => {
    const outsideIngButton = !selectIngButton.contains(e.target);
    const outsideIngList   = !selectIngList.contains(e.target);

    if (outsideIngButton && outsideIngList) {
      selectIngList.classList.remove("dish__ing__list__active");
      toOpacity.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      });
      toOpacityTypes.classList.remove("to__ing__opacity");
      unitBox.forEach((elem) => {
        elem.classList.remove("unit__opa");
      })
    }
  });
}

//select unit
const selectUnitButton     = document.querySelector(".unit__button");
const selectUnitList       = document.querySelector(".unit__list");
const selectUnitItems  = document.querySelectorAll(".unit__list li");
const checkedUnit      = document.querySelector(".checked__unit");

if(selectUnitButton) {
  selectUnitButton.addEventListener("click", (e) => {
    e.stopPropagation();
    selectUnitList.classList.toggle("unit__list__active");
    toOpacityTypes.classList.toggle("to__ing__opacity");
    toOpacity.forEach((elem) => {
      elem.classList.toggle("to__ing__opacity");
    })
    ingBox.forEach((elem) => {
      elem.classList.toggle("to__ing__opacity");
    })
  });

  selectUnitItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      checkedUnit.innerText = item.innerText;
      selectUnitList.classList.remove("unit__list__active");
      toOpacity.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      })
      toOpacityTypes.classList.remove("to__ing__opacity");
      ingBox.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      })
    });
  });

  document.addEventListener("click", (e) => {
    const outsideIngButton = !selectUnitButton.contains(e.target);
    const outsideIngList   = !selectUnitList.contains(e.target);

    if (outsideIngButton && outsideIngList) {
      selectUnitList.classList.remove("unit__list__active");
      toOpacity.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      });
      toOpacityTypes.classList.remove("to__ing__opacity");
      ingBox.forEach((elem) => {
        elem.classList.remove("to__ing__opacity");
      })
    }
  });
}

//IngredientsScroll
if(document.querySelectorAll(".fade").length > 0) {
  ScrollTrigger.matchMedia({
    "(min-width: 1257px)": function () {
      const animations = [
        {
          elements: ".fade",
          trigger: ".ing__title"
        },
      ];

      animations.forEach(({elements, trigger}) => {
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
}

//add ing button
const addIngButton = document.querySelector(".add__another__ing");
const ingNumber = Array.from(document.querySelectorAll(".ing__number"));
const addLetters = document.querySelectorAll(".add__fade");
// console.log(ingNumber[ingNumber.length - 1]);



//INGREDIENTS END

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
