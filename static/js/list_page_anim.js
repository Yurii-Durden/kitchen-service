//scroll to the top
ScrollTrigger.create({
  trigger: ".pinned__section",
  start: "top top",
  end: "+=99999",
  pin: true,
  pinSpacing: false,
  scrub: true
});

const elementsToBlur = [
  ".main__block",
  ".page__count"
];

//blur first section
const angleDown = document.querySelector(".angle__down");

gsap.to(elementsToBlur, {
  filter: "blur(15px)",
  ease: "none",
  scrollTrigger: {
    trigger: ".scrollable__section",
    start: 0,
    end: 500,
    scrub: true,
  }
});

gsap.to(angleDown, {
  filter: "blur(10px)",
  opacity: 0,
  y: "25px",
  ease: "none",
  scrollTrigger: {
    trigger: ".scrollable__section",
    start: 0,
    end: 100,
    scrub: true,
  }
});

//page load anim
window.addEventListener("DOMContentLoaded", () => {
  const titleAllLetters = document.querySelectorAll(".fade__title__all");
  const searchForm = document.querySelector(".search__form");
  const paginationLetters = document.querySelectorAll(".fade__pag");
  const plsScroll = document.querySelector(".pls__scroll");

  gsap.to(titleAllLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.09,
    delay: 0.1
  });

  gsap.to(searchForm, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.5
  });

  gsap.to(buttonLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.5
  });

  gsap.to(paginationLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.01,
    delay: 0.8
  });

    gsap.to(plsScroll, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.0,
    ease: "power2.out",
    stagger: 0.01,
    delay: 1.1
  });
});

//cook create button hover
const createButton = document.querySelector(".create__button");
const buttonLetters = Array.from(document.querySelectorAll(".create__fade"));

createButton.addEventListener("mouseenter", () => {
  const tl = gsap.timeline();

  tl.to(buttonLetters, {
    opacity: 0,
    x: 15,
    filter: "blur(5px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.04,
  }, 0);
});

createButton.addEventListener("mouseleave", () => {
  const tl = gsap.timeline();

  tl.to(buttonLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.out",
    stagger: 0.03,
  }, 0);
});

// cook links hover

const userNicks = document.querySelectorAll(".username");

if (userNicks) {
  userNicks.forEach(userNick => {
    const userLetters = Array.from(userNick.querySelectorAll(".user__letters"));

    userNick.addEventListener("mouseenter", () => {
      gsap.to(userLetters, {
        opacity: 0,
        x: 15,
        filter: "blur(5px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: "auto"
      });
    });

    userNick.addEventListener("mouseleave", () => {
      gsap.to(userLetters, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: "auto"
      });
    });
  });
}

//dish hover
const dish = document.querySelectorAll(".dish__list__item");

if (dish) {
  dish.forEach(dishName => {
    const dishLink = dishName.querySelector(".dish__link");
    console.log(dishLink)

    dishName.addEventListener("mouseenter", () => {
      gsap.to(dishLink, {
        opacity: 0,
        x: 15,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        overwrite: "auto"
      });
    });

    dishName.addEventListener("mouseleave", () => {
      gsap.to(dishLink, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        overwrite: "auto"
      });
    });
  });
}


//pagination hover
const paginationButtons = document.querySelectorAll(".page__link");

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

//search form
const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() !== "") {
    searchForm.classList.add("search__form--filled");
  } else {
    searchForm.classList.remove("search__form--filled");
  }
});
