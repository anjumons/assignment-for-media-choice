var slideIndex, slides, dots, captionText_1, captionText_2;
var darkmode = false;
initGallery();
function initGallery() {
    slideIndex = 0;
    slides = document.getElementsByClassName("image-holder");
    if (slides.length !== 0) {
        slides[slideIndex].style.opacity = 1;

        //    -------------------- capturing caption of each banner--------------------
        captionText_1 = document.querySelector(".captionTextHolder .captionText1");
        captionText_1.innerText = slides[slideIndex].querySelector(".caption-text-1").innerText;
        captionText_2 = document.querySelector(".captionTextHolder .captionText2");
        captionText_2.innerText = slides[slideIndex].querySelector(".caption-text-2").innerText;
        //    ------------x-------- capturing caption of each banner-----------x---------

        // ------------------------left and right slider arrow--------------------------

// -----------------------------------------------add event listener to change theme-------------------------
        toggleSwitch = document.querySelector('.changemode');
        toggleSwitch.addEventListener('click', switchTheme, false);

        // ----------------------open the dropdown-------------------------------------
        document.querySelector(".user ").addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
}
function moveSlide(n) {
    let i, current, next;
    var moveSlideAnimClass = {
        forCurrent: "",
        forNext: ""
    }
    var slideTextAnimClass;
    if (n > slideIndex) {
        if (n >= slides.length) { n = 0 }
        moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide";
        moveSlideAnimClass.forNext = "moveLeftNextSlide";

    } else if (n < slideIndex) {
        if (n < 0) { n = slides.length - 1; }
        moveSlideAnimClass.forCurrent = "moveRightCurrentSlide";
        moveSlideAnimClass.forNext = "moveRightPrevSlide";
    }
    if (n != slideIndex) {
        next = slides[n];
        current = slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "image-holder";
            slides[i].style.opacity = 0;
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        slideIndex = n;
        captionText_1.style.display = "none";
        captionText_1.className = "captionText1 " + "slideTextFromTop";
        captionText_1.innerText = slides[n].querySelector(".caption-text-1").innerText;
        captionText_1.style.display = "block";

        captionText_2.style.display = "none";
        captionText_2.className = "captionText2 " + "slideTextFromBottom";
        captionText_2.innerText = slides[n].querySelector(".caption-text-2").innerText;
        captionText_2.style.display = "block";
    }
}
// -----------x-------------left and right slider arrow--------------x------------

function plusSlides(n) {
    moveSlide(slideIndex + n);
}
var x = 1;
timer = window.setInterval(function () {
    moveSlide(slideIndex + 1);
    x += 1;
}, 5000);

var mapobj = new Map();
function SliderArrowClicked(direction, id, e) {
    let offset;
    let maxX;
    let card;
    let cardCount;
    const carousel = document.querySelector("#" + id);
    if (id == "character-slider") {
        card = carousel.querySelector(".card");
        cardCount = carousel.querySelectorAll("[data-target='card']").length;
    } else {
        card = carousel.querySelector(".category-item-box");
        cardCount = carousel.querySelectorAll("[data-target='category-item-box']").length;
    }
    const carouselWidth = carousel.offsetWidth;
    const cardStyle = card.currentStyle || window.getComputedStyle(card);
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

    if (!mapobj.has(id)) {
        offset = 0;
        maxX = -((cardCount / 3) * carouselWidth +
            (cardMarginRight * (cardCount / 3)) -
            carouselWidth - cardMarginRight);

        mapobj.set(id, { "offset": offset, "max": maxX });
    } else if (mapobj.has(id)) {
        offset = mapobj.get(id).offset;
        maxX = mapobj.get(id).max;
    }

    if (direction == 'left') {
        if (offset !== 0) {
            offset += carouselWidth + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    } else if (direction == 'right') {
        if (offset !== maxX) {
            offset -= carouselWidth + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    }
    mapobj.set(id, { "offset": offset, "max": maxX });
}

function switchTheme(e) {
    if (!darkmode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.changemode >a').innerHTML="Light Mode"
        darkmode = true;
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.changemode >a').innerHTML="Dark Mode"
        darkmode = false;
    }
}




