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
document.addEventListener("DOMContentLoaded", () => {
  const formWrapper = document.querySelector(".dish__type__form");
  const ingWrapper = document.querySelector(".form__ing__wrapper");

  const checkedElem = document.querySelector(".selected__text");
  const selectList  = document.querySelector(".dish__type__list");

  const addIngredientBtn = document.getElementById("add-ingredient");
  const totalFormsInput = document.querySelector('input[name="dishes-TOTAL_FORMS"]');

  const

  if (formWrapper) {

    formWrapper.addEventListener("click", (e) => {
      const getToOpacityArray = () => {
        return Array.from(document.querySelectorAll(".to__opacity")).filter(el => !el.contains(e.target));
      };

      function activateDim() {
        getToOpacityArray().forEach(el => el.classList.add("to__opacity__active"));
      }

      function deactivateDim() {
        getToOpacityArray().forEach(el => el.classList.remove("to__opacity__active"));
      }

      const selectBtn = e.target.closest(".select__list__button");
      const listItem = e.target.closest(".dish__type__item");

      // Select type item
      if (listItem) {
        e.stopPropagation();
        const itemText = listItem.querySelector(".item__text")?.innerText || "---------";
        checkedElem.innerText = itemText;
        selectList.classList.remove("dish__type__list__active");
        deactivateDim();
        return;
      }

      // Open type list
      if (selectBtn) {
        e.stopPropagation();
        console.log(e.target.closest(".to__opacity"))
        const isActive = selectList.classList.toggle("dish__type__list__active");
        isActive ? activateDim() : deactivateDim();
        return;
      }

      // Select ingredient item
      const ingItem = e.target.closest(".ing__list li");
      if (ingItem) {
        e.stopPropagation();
        const label = ingItem.querySelector(".ing__elem");
        const selectedText = label?.innerText || "";
        const ingredientBlock = ingItem.closest(".ingredient__block");
        if (ingredientBlock) {
          const selectedSpan = ingredientBlock.querySelector(".selected__ing");
          if (selectedSpan) selectedSpan.innerText = selectedText;
          const ingList = ingredientBlock.querySelector(".ing__list");
          if (ingList) ingList.classList.remove("dish__ing__list__active");
        }
        deactivateDim();
        return;
      }

      const ingBtn = e.target.closest(".choose__ing__button");
      if (ingBtn) {
        e.stopPropagation();
        const ingList = ingBtn.querySelector(".ing__list");
        if (ingList) ingList.classList.toggle("dish__ing__list__active");
        activateDim();
        return;
      }

      // Select unit item
      const unitItem = e.target.closest(".unit__list li");
      if (unitItem) {
        e.stopPropagation();
        const label = unitItem.querySelector("label em");
        const selectedText = label?.innerText || "";
        const ingredientBlock = unitItem.closest(".ingredient__block");
        if (ingredientBlock) {
          const selectedSpan = ingredientBlock.querySelector(".selected__unit");
          if (selectedSpan) selectedSpan.innerText = selectedText;
          const unitList = ingredientBlock.querySelector(".unit__list");
          if (unitList) unitList.classList.remove("unit__list__active");
        }
        deactivateDim();
        return;
      }

      const unitBtn = e.target.closest(".unit__button");
      if (unitBtn) {
        e.stopPropagation();
        const unitList = unitBtn.querySelector(".unit__list");
        if (unitList) unitList.classList.toggle("unit__list__active");
        activateDim();
        return;
      }

      document.querySelectorAll(".dish__ing__list__active").forEach(list => list.classList.remove("dish__ing__list__active"));
      document.querySelectorAll(".unit__list__active").forEach(list => list.classList.remove("unit__list__active"));
      selectList.classList.remove("dish__type__list__active");
      deactivateDim();

      // Delete ingredient block
      const closeBtn = e.target.closest(".svg__close");
      if (closeBtn) {
        e.stopPropagation();
        const ingredientBlock = closeBtn.closest(".ingredient__block");
        if (!ingredientBlock) return;
        const blocks = formWrapper.querySelectorAll(".ingredient__block");
        if (blocks.length <= 1) {
          alert("You can't remove the last ingredient block. Leave it empty if you don't need it.");
          return;
        }

        const deleteCheckbox = ingredientBlock.querySelector('input[type="checkbox"][name$="-DELETE"]');
        if (deleteCheckbox) {
          deleteCheckbox.checked = true;
        }

        ingredientBlock.style.display = "none";

        const visibleBlocks = Array.from(
            ingWrapper.querySelectorAll(".ingredient__block")
        ).filter(block =>
            getComputedStyle(block).display !== "none" &&
            !block.closest("#empty-form-template")
        );

        visibleBlocks.forEach((block, index) => {
          block.querySelector(".ing__number").textContent = `${index + 1}`;
        });

        ScrollTrigger.refresh();
        return;
      }

    });

    // Add a new ingredient block
    addIngredientBtn.addEventListener("click", () => {
      const totalForms = parseInt(totalFormsInput.value);
      const maxForms = 1000;

      if (totalForms >= maxForms) {
        alert("Max count of forms");
        return;
      }

      const template = document.querySelector("#empty-form-template");
      if (!template) {
        console.error("Empty form template not found!");
        return;
      }

      let newFormHtml = template.innerHTML.replace(/__prefix__/g, totalForms);

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = newFormHtml;

      const newIngredientBlock = tempDiv.firstElementChild;
      if (!newIngredientBlock) {
        console.error("Failed to create new form block");
        return;
      }

      ingWrapper.insertBefore(newIngredientBlock, addIngredientBtn);

      const visibleBlocks = Array.from(
          ingWrapper.querySelectorAll(".ingredient__block")
      ).filter(block =>
          getComputedStyle(block).display !== "none" &&
          !block.closest("#empty-form-template")
      );

      visibleBlocks.forEach((block, index) => {
        block.querySelector(".ing__number").textContent = `${index + 1}`
      })

      totalFormsInput.value = totalForms + 1;

      newIngredientBlock.querySelectorAll("[data-cursor-bound]").forEach(el => {
        delete el.dataset.cursorBound;
      });
      initCursorHoverEffects();
      ScrollTrigger.refresh();
    });
  }
});



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
  const ingTitle = document.querySelector(".ing__title__box");
  const ingBox = document.querySelectorAll(".ingredient__block");
  const addIngB = document.querySelector(".add__another__ing__box");

  const hash = window.location.hash;

  if (hash === "#ingredients") {
    const introSection = document.querySelector(".intro");
    if (introSection) {
      introSection.style.display = "none";
      ingTitle.style.marginTop = "10vh";
    }
  }

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

  if (ingTitle) {
    gsap.to(ingTitle, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

  if (addIngB) {
    gsap.to(addIngB, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3
    });
  }

  if (ingBox.length > 0) {
    gsap.set(ingBox, {
      opacity: 0,
      x: 15,
      filter: "blur(10px)"
    });

    gsap.to(ingBox, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.01,
      delay: 0.3,
      clearProps: "filter,opacity,transform,willChange,zIndex"
    });
  }
});
