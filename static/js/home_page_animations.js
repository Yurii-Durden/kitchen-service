const first_section_line = document.querySelector(".first_section_line");
const second_section_line = document.querySelector(".second_section_line");

const second_section = document.querySelector(".second_section")
const third_section = document.querySelector(".third_section")

window.addEventListener("scroll", linesScrollAnim)
function linesScrollAnim() {
    const s_section_height = second_section.offsetHeight;
    const f_section_offset = offset(second_section).top;
    const anim_start = 3;

    let s_anim_item_point = window.innerHeight - s_section_height / anim_start;

    if (scrollY > f_section_offset - s_anim_item_point) {
        first_section_line.classList.add("_active");
    } else {
        first_section_line.classList.remove("_active");
    }

    const t_section_height = third_section.offsetHeight;
    const t_section_offset = offset(third_section).top;

    let t_anim_item_point = window.innerHeight - t_section_height / anim_start;

    if (scrollY > t_section_offset - t_anim_item_point) {
        second_section_line.classList.add("_active");
    } else {
        second_section_line.classList.remove("_active");
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
}

// додавати значення скролу до відступу між великим текстом, доти, доки воно не буде рівне початковому
