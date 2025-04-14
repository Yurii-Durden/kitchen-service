const vision_section = document.querySelector(".vision-section");
const words_to_move = document.querySelectorAll(".word_to_move");

addEventListener("scroll", () => {
        section_color_fade_scroll();
    }
)

let current_opacity = 0;

function section_color_fade_scroll() {
    const section_top = vision_section.offsetTop;
    const scroll_top = window.scrollY;
    const window_height = window.innerHeight;

    const start_fade = section_top;
    const fade_range = window_height / 3;
    const end_fade = start_fade + fade_range;

    const progress = Math.min(Math.max((scroll_top - start_fade) / (end_fade - start_fade), 0), 1);

    vision_section.style.backgroundColor = `rgba(20, 24, 19, ${progress})`;

    if (progress > 0.7) {
        startWordSpacingAnimation();
    } else {
        reverseWordSpacingAnimation();
    }
}




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

function startWordSpacingAnimation() {
    for (let index = 0; index < words_to_move.length; index++) {
        let word = words_to_move[index];
        let x = parseFloat(word.getAttribute("x"));
        let stop = parseFloat(word.dataset.stopPosition);
        let speed = parseFloat(word.dataset.speed);

        if (x < stop) {
            x += speed;
            word.setAttribute("x", x.toString());
        }
    }
}

function reverseWordSpacingAnimation() {
    for (let index = 0; index < words_to_move.length; index++) {
        let word = words_to_move[index];
        let x = parseFloat(word.getAttribute("x"));
        let start = parseFloat(word.dataset.primary_position);
        let speed = parseFloat(word.dataset.speed);

        if (x > start) {
            x -= speed;
            word.setAttribute("x", x.toString());
        }
    }
}
