const vision_section = document.querySelector(".vision-section");

addEventListener("scroll", section_color_fade)
function section_color_fade() {
    if (isInViewport(vision_section)) {
        vision_section.classList.add("vision-section-anime")
    } else {
        vision_section.classList.remove("vision-section-anime")
    }


    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < 1;
    }
}

