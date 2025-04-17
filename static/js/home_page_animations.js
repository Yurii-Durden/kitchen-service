const project_title = document.querySelector(".project-title");
const text_under_project_title = document.querySelector(".counter-info-list");
const scroll_down_text = document.querySelector(".scroll-down-text");

const first_section_line = document.querySelector(".first_section_line");
const second_section_line = document.querySelector(".second_section_line");
const second_section = document.querySelector(".second_section");
const third_section = document.querySelector(".third_section");

const second_section_body = document.querySelector(".home-described-section-body");
const third_section_body = document.querySelector(".home-described-project-section-body");

window.addEventListener("scroll", () => {
    if (window.innerWidth >= 774) {
        lines_scroll_anim();
    }
    title_to_the_top();
    make_section_text_transparent();
    }
);

function lines_scroll_anim() {
    const anim_start = 3;
    const fast_scroll_range = window.innerHeight / 2;

    const scroll_top = scrollY || window.scrollY;

    const s_section_height = second_section.offsetHeight;
    const s_section_offset = offset(second_section).top;
    const s_anim_item_point = window.innerHeight - s_section_height / anim_start;

    const s_progress = (scroll_top - (s_section_offset - s_anim_item_point)) / fast_scroll_range;
    const s_clamped = Math.min(Math.max(s_progress, 0), 1);
    const s_translateY = 50 - (s_clamped * 50);
    second_section_body.style.transform = `translateY(${s_translateY}%)`;

    const s_line_width = Math.min(s_clamped, 1) * 100;
    first_section_line.style.width = `${s_line_width}%`;

    const t_section_height = third_section.offsetHeight;
    const t_section_offset = offset(third_section).top;
    const t_anim_item_point = window.innerHeight - t_section_height / anim_start;

    const t_progress = (scroll_top - (t_section_offset - t_anim_item_point)) / fast_scroll_range;
    const t_clamped = Math.min(Math.max(t_progress, 0), 1);
    const t_translateY = 50 - (t_clamped * 50);
    third_section_body.style.transform = `translateY(${t_translateY}%)`;

    const t_line_width = Math.min(t_clamped, 1) * 100;
    second_section_line.style.width = `${t_line_width}%`;

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
}


function title_to_the_top() {
    const maxScroll = 300;
    const maxTranslate = -250;

    let scrollValue = Math.min(scrollY, maxScroll);
    let y_position = (scrollValue / maxScroll) * maxTranslate;

    project_title.style.transform = `translateY(${y_position}px)`;
}

function make_section_text_transparent() {
    let maxScroll = 130;
    let maxOpacity = 1;

    let scrollValue = Math.min(scrollY, maxScroll);
    let opacityValue = 1 - (scrollValue / maxScroll);

    text_under_project_title.style.opacity = opacityValue.toString();
    scroll_down_text.style.opacity = opacityValue.toString();
}


