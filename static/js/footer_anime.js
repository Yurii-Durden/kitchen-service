const footer = document.querySelector(".footer");
const footer_line = document.querySelector(".footer-line");

addEventListener("scroll", footerSrollAnimation);

function footerSrollAnimation () {

    if (isInViewport(footer)) {
        footer_line.classList.add("footer-line_animate");
    } else {
        footer_line.classList.remove("footer-line_animate")
    }

    function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.top < windowHeight - (footer.offsetHeight / 2);
    }
}

