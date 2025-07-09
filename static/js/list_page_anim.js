// Scroll to the top
ScrollTrigger.create({
  trigger: ".pinned__section",
  start: "top top",
  end: "+=99999",
  pin: true,
  pinType: "transform",
  pinSpacing: false,
  scrub: true
});

const scrollableSection = document.querySelector(".scrollable__section");

document.addEventListener("click", (e) => {
  const scrollTop = window.scrollY;

  if (!scrollableSection.contains(e.target)) {
    if (scrollTop > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
});

const elementsToBlur = [
  document.querySelector(".main__block"),
  document.querySelector(".page__count"),
];


// Blur first section
const angleDown = document.querySelector(".angle__down");

gsap.to(elementsToBlur, {
  filter: "blur(15px)",
  ease: "none",
  pointerEvents: "none",
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

// Buttons hover
const createButton = document.querySelector(".create__button");
const buttonLetters = Array.from(document.querySelectorAll(".create__fade"));
ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function () {
    // cook create button hover
    createButton?.addEventListener("mouseenter", () => {
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

    createButton?.addEventListener("mouseleave", () => {
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

    // Cook links hover
    const userNicks = document.querySelectorAll(".username");

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

    // Dish and dish type hover
    const dish = document.querySelectorAll(".target__block");

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
});

// Search form
const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search__form");

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() !== "") {
    searchForm.classList.add("search__form--filled");
  } else {
    searchForm.classList.remove("search__form--filled");
  }
});

// Filter click
const filter_by_button = document.querySelector(".filter__by__text");
const filter_links = Array.from(document.querySelectorAll(".choose__type__item"));
const dishChooseBox = document.querySelector(".choose__box");
const pageListBox = document.querySelector(".page__list__box");

let isOpen = false;
let previousScroll = 0;
let prevNextButtonTrigger = null;

if (filter_by_button) {
  filter_by_button.addEventListener("click", toggleMenu);
}

document.addEventListener("click", (event) => {
  if (isOpen && !dishChooseBox.contains(event.target) && !filter_by_button.contains(event.target)) {
    toggleMenu();
  }
});

window.addEventListener("scroll", () => {
  if (isOpen && window.scrollY <= previousScroll) {
    toggleMenu();
  }
});

const hasData = document.querySelector(".data__list");

if (!hasData) {
  body.style.overflow = "hidden";
}

function toggleMenu() {
  const tl = gsap.timeline();
  const hasData = document.querySelector(".data__list");
  const body = document.body;
  const prevNextButton = document.querySelectorAll(".prev__next__button");

  if (!isOpen) {
    previousScroll = window.scrollY;
    const shiftY = window.innerHeight * 0.7;

    window.scrollTo({
      top: previousScroll + shiftY,
      behavior: "smooth"
    });

    if (pageListBox) pageListBox.style.display = "none";
    if (dishChooseBox) dishChooseBox.style.display = "block";

    body.style.overflow = "auto";

    if (filter_links.length > 0) {
      tl.fromTo(filter_links,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
          stagger: 0.1
        },
        0
      );
    }

    if (prevNextButton.length > 0 && !prevNextButtonTrigger) {
      prevNextButtonTrigger = gsap.to(prevNextButton, {
        filter: "blur(15px)",
        pointerEvents: "none",
        ease: "none",
        scrollTrigger: {
          trigger: ".scrollable__section",
          start: 0,
          end: 500,
          scrub: true,
        }
      });
    }

  } else {
    window.scrollTo({
      top: previousScroll,
      behavior: "smooth"
    });

    if (filter_links.length > 0) {
      tl.to([...filter_links].reverse(), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.05
      }, 0);
    }

    if (pageListBox) {
      tl.add(() => {
        pageListBox.style.display = "flex";
        if (prevNextButtonTrigger) {
          prevNextButtonTrigger.scrollTrigger.kill();
          prevNextButtonTrigger.kill();
          prevNextButtonTrigger = null;
          prevNextButton.forEach((e) => {
            e.style.filter = "none";
            e.style.pointerEvents = "auto";
          })
        }

      }, ">");
    }

    if (dishChooseBox) {
      tl.add(() => {
        dishChooseBox.style.display = "none";
      }, ">");
    }

    if (!hasData) {
      body.style.overflow = "hidden";
    }
  }

  isOpen = !isOpen;
}

// Filter button hover
const typeLinks = document.querySelectorAll(".filter__buttons");
ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function () {

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
  }
});

// Page load anim
window.addEventListener("DOMContentLoaded", () => {
  const titleAllLetters = document.querySelectorAll(".fade__title__all");
  const searchForm = document.querySelector(".search__form");
  const paginationLetters = document.querySelectorAll(".fade__pag");
  const plsScroll = document.querySelector(".pls__scroll");
  const noText = document.querySelector(".no__data__text em");

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

  if(noText) {
    gsap.to(noText, {
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

// Pagination hover
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
