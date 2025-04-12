const vision_section = document.querySelector(".vision-section");
const words_to_move = document.querySelectorAll(".word_to_move");
const big_text = document.querySelector(".big-text")

addEventListener("scroll", () => {
        section_color_fade();
        moving_words();
    }
)

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

addEventListener("scroll", () => {
    section_color_fade();
    moving_words();
});

function moving_words() {
    for (let index = 0; index < words_to_move.length; index++) {
        let word_to_move = words_to_move[index];
        let x_position = parseFloat(word_to_move.getAttribute("x"));
        let stop_position = parseFloat(word_to_move.dataset.stopPosition);
        let speed = parseFloat(word_to_move.dataset.speed);
        let primary_position = parseFloat(word_to_move.dataset.primary_position);

        if (wordIsInViewport(big_text)) {
            if (x_position < stop_position) {
                x_position += speed;
                word_to_move.setAttribute("x", x_position.toString());
            }
        } else {
            if (x_position > primary_position)
                x_position -= speed;
                word_to_move.setAttribute("x", x_position.toString())
            }
    }
}

    function wordIsInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < big_text.offsetHeight;
}
