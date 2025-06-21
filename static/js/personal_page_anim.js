//update delete buttons hover
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

//add button hover
const addButton = document.querySelector(".add__cook__button");

if (addButton) {
  const addedCookList = document.querySelector(".added__cooks__list");
  const cooksList = document.querySelector(".cooks__list");

  addButton.addEventListener("click", () => {
    const arrowDown = document.querySelector(".arrow__down");
    arrowDown.classList.toggle("arrow__down__active");

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
          });
        }
      });
    }
  });
}

//page load anim
window.addEventListener("DOMContentLoaded", () => {
  //cook
  const titleAnimItems = document.querySelectorAll(".title__anim__item");
  const loadAnimItems = document.querySelectorAll(".load__anim__item");
  const loadAnimButton = document.querySelectorAll(".delete__update__button");

  //dish
  const animItem = document.querySelectorAll(".anim__item");

  if(animItem.length > 0 && animItem.length > 0) {

    gsap.to(animItem, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.4
    });
  }

  gsap.to(titleAnimItems, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.6,
    ease: "power2.out",
    stagger: 0.1,
    delay: 0.1
  });

  gsap.to(loadAnimItems, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.4
  });


  gsap.to(loadAnimButton, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.4
  });
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

