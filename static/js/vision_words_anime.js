const vision_section = document.querySelector(".vision-section");
const vision_section_body = document.querySelector(".vision-section-body");
const words_to_move = document.querySelectorAll(".word_to_move");
const third_section_line = document.querySelector(".vision-section-line");

addEventListener("scroll", () => {
        vision_scroll_anim();
    }
)

words_to_move.forEach((word_to_move, index) => {
    let stop_position, speed, primary_position;

    if (index === 0) {
        primary_position = word_to_move.getAttribute("x")
        stop_position = 735.642;
        speed = 0.6;

    } else if (index === 1) {
        primary_position = word_to_move.getAttribute("x")
        stop_position = 1095.71;
        speed = 1.2;
    } else if (index === 2) {
        primary_position = word_to_move.getAttribute("x")
        stop_position = 572;
        speed = 0.6;
    } else if (index === 3) {
        primary_position = word_to_move.getAttribute("x")
        stop_position = 736.891;
        speed = 1.2;
    } else if (index === 4) {
        primary_position = word_to_move.getAttribute("x")
        stop_position = 427.766;
        speed = 0.45
    } else if (index === 5) {
        primary_position = word_to_move.getAttribute("x")
        stop_position = 896.379;
        speed = 0.84;
    }

    word_to_move.dataset.stopPosition = stop_position.toString();
    word_to_move.dataset.speed = speed.toString();
    word_to_move.dataset.primary_position = primary_position.toString();
});

function vision_scroll_anim() {
    const anim_start = 6;
    const fast_scroll_range = window.innerHeight / 2;
    const scroll_top = scrollY || window.scrollY;

    const v_section_height = vision_section.offsetHeight;
    const v_section_offset = offset(vision_section).top;
    const v_anim_item_point = window.innerHeight - v_section_height / anim_start;

    const v_progress = (scroll_top - (v_section_offset - v_anim_item_point)) / fast_scroll_range;
    const v_clamped = Math.min(Math.max(v_progress, 0), 1);
    const v_translateY = 50 - (v_clamped * 50);

    vision_section_body.style.transform = `translateY(${v_translateY}%)`;

    const v_line_width = v_clamped * 100;
    third_section_line.style.width = `${v_line_width}%`;

    const word_start = 0.7;
    const word_progress = Math.max((v_clamped - word_start) / (1 - word_start), 0);
    animateWords(word_progress);

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    function animateWords(progress) {
        words_to_move.forEach((word) => {
            const startX = parseFloat(word.dataset.primary_position);
            const stopX = parseFloat(word.dataset.stopPosition);
            const distance = stopX - startX;

            const newX = startX + distance * progress;
            word.setAttribute("x", newX.toString());
        });
    }
}
