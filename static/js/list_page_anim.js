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

//cook create button hover
const createButton = document.querySelector(".create__button");
const buttonLetters = Array.from(document.querySelectorAll(".create__fade"));

createButton.addEventListener("mouseenter", () => {
  const tl = gsap.timeline();

  tl.to(buttonLetters, {
    opacity: 0,
    x: 15,
    filter: "blur(5px)",
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.05,
  }, 0);
});

createButton.addEventListener("mouseleave", () => {
  const tl = gsap.timeline();

  tl.to(buttonLetters, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.05,
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

//dish and dish type hover
const dish = document.querySelectorAll(".target__block");

if (dish) {
  dish.forEach(dishName => {
    const dishLink = dishName.querySelector(".to__anim__elem");

    dishName.addEventListener("mouseenter", () => {
      gsap.to(dishLink, {
        opacity: 0,
        x: 20,
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

// filter open
const filter_by_button = document.querySelector(".filter__by__text");
const filter_links = Array.from(document.querySelectorAll(".choose__type__item"));
const blurElements = document.querySelectorAll(".to__opacity");
const dishChooseBox = document.querySelector(".dish__choose__box");
const arrow = document.querySelector(".arrow__down");

let isOpen = false;

if (filter_by_button) {
  filter_by_button.addEventListener("click", () => {
    toggleMenu();
  });
}

document.addEventListener("click", (event) => {
  if (isOpen && !dishChooseBox.contains(event.target) && !filter_by_button.contains(event.target)) {
    toggleMenu();
  }
});

function toggleMenu() {
  const tl = gsap.timeline();

  if (!isOpen) {
    body.classList.add("hide__scroll");
    arrow.style.opacity = 1;
    setTimeout(() => {
      filter_by_button.style.display = "none";
    }, 1000);

    tl.to(filter_links, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      pointerEvents: "auto",
      ease: "power2.out",
      stagger: 0.08,
    }, 0);

    if (blurElements.length > 0) {
      tl.to(blurElements, {
        opacity: 0,
        duration: 0.8,
        pointerEvents: "none",
        ease: "power2.out"
      }, 0);
    }

  } else {
    body.classList.remove("hide__scroll");
    setTimeout(() => {arrow.style.opacity = 0;}, 200)
    filter_by_button.style.display = "inline-block";

    tl.to([...filter_links].reverse(), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      pointerEvents: "none",
      ease: "power2.inOut",
      stagger: 0.05,
    }, 0);

    if (blurElements.length > 0) {
      tl.to(blurElements, {
        opacity: 1,
        duration: 1,
        pointerEvents: "auto",
        ease: "power2.inOut"
      }, 0.7);
    }
  }

  isOpen = !isOpen;
}


//type link hover
const typeLinks = document.querySelectorAll(".filter__buttons");

if (typeLinks.length > 0) {
  typeLinks.forEach(typeLink => {
    const typeNameLetters = typeLink.querySelectorAll(".type_name_letter");

    typeLink.addEventListener("mouseenter", () => {
      gsap.to(typeNameLetters, {
        opacity: 0,
        x: 15,
        filter: "blur(5px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.05,
        overwrite: "auto"
      });
    });

    typeLink.addEventListener("mouseleave", () => {
      gsap.to(typeNameLetters, {
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

  if(filter_by_button) {
    gsap.to(filter_by_button, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.5
    });
  }

  if (paginationLetters.length > 0) {
    gsap.to(paginationLetters, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.8
    });
  }

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

//pagination hover
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
