// button hover
ScrollTrigger.matchMedia({

  "(min-width: 1024px)": function () {
    const updateDeleteButtons = document.querySelectorAll(".delete__update__button");

    updateDeleteButtons.forEach((button) => {
      const letters = Array.from(button.querySelectorAll(".anim__button"));

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


const addButton = document.querySelector(".add__cook__button");

if (addButton) {
  const addedCookList = document.querySelector(".added__cooks__list");
  const cooksList = document.querySelector(".cooks__list");
  const noTextDish = document.querySelector(".no__text__dish");
  let isAnimating = false;

  addButton.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const arrowDown = document.querySelector(".arrow__down");
    arrowDown.classList.toggle("arrow__down__active");

    if (!addedCookList) {
      const isHidden = getComputedStyle(cooksList).opacity === "0";

      if (isHidden) {
        gsap.to(noTextDish, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            cooksList.style.pointerEvents = "auto";
            gsap.to(cooksList, {
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              onComplete: () => {
                isAnimating = false;
              }
            });
          }
        });
      } else {
        cooksList.style.pointerEvents = "none";
        gsap.to(cooksList, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(noTextDish, {
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              onComplete: () => {
                isAnimating = false;
              }
            });
          }
        });
      }
      return;
    }

    const isHidden = getComputedStyle(addedCookList).opacity === "0";

    if (isHidden) {
      cooksList.style.pointerEvents = "none";
      gsap.to(cooksList, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          addedCookList.style.pointerEvents = "auto";
          gsap.to(addedCookList, {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            }
          });
        }
      });
    } else {
      addedCookList.style.pointerEvents = "none";
      gsap.to(addedCookList, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          cooksList.style.pointerEvents = "auto";
          gsap.to(cooksList, {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            }
          });
        }
      });
    }
  });
}


//page load anim
window.addEventListener("DOMContentLoaded", () => {
  // cook
  const titleAnimItems = document.querySelectorAll(".title__anim__item");
  const loadAnimItems = document.querySelectorAll(".load__anim__item");
  const loadAnimButton = document.querySelectorAll(".button__item");
  const dishList = document.querySelector(".dish__list");
  const noText = document.querySelector(".no__text");

  // dish
  const animItem = document.querySelectorAll(".anim__item");
  const cooksList = document.querySelector(".added__cooks__list");

  if (titleAnimItems.length > 0) {
    gsap.to(titleAnimItems, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.1,
    });
  }

  if (animItem.length > 0 && cooksList) {
    gsap.to(animItem, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.4,
    });

    gsap.to(cooksList, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      delay: 0.5,
    });
  }

  if (loadAnimItems.length > 0) {
    gsap.to(loadAnimItems, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.4,
    });
  }

  if (dishList) {
    gsap.to(dishList, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      delay: 0.5,
    });
  }

  if (loadAnimButton.length > 0) {
    gsap.to(loadAnimButton, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.4,
    });
  }

  if (noText) {
    gsap.to(noText, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      delay: 0.4,
    });
  }
});

//pagination
const paginationButtons = document.querySelectorAll(".page__link");

if (paginationButtons.length > 0) {

  paginationButtons.forEach((box) => {
    const paginationLetters = Array.from(box.querySelectorAll(".fade__p"));

    box.addEventListener("mouseenter", () => {
      const tl = gsap.timeline();

      tl.to([...paginationLetters].reverse(), {
        opacity: 0,
        x: 15,
        filter: "blur(5px)",
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.1,
      }, 0);
    });

    box.addEventListener("mouseleave", () => {
      const tl = gsap.timeline();

      tl.to(paginationLetters, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      }, 0);
    });
  });
}

//scroll to  appear
ScrollTrigger.matchMedia({
  "(min-width: 1025px)": function () {
    const animations = [
      {
        elements: ".fade",
        trigger: ".second__title"
      },
      {
        elements: ".fade",
        trigger: ".dish__second__title"
      },
    ];

    animations.forEach(({ elements, trigger , markers}) => {
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
        stagger: 0.09,
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

