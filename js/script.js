const resetBtn = document.querySelector(".reset-btn");
const progressBar = document.querySelector(".progress-bar");
const carouselWrapper = document.getElementById("carousel-wrapper");
const slideTemplate = document.getElementById('template-slide').innerHTML;
Mustache.parse(slideTemplate);

slidesData.forEach(slideData => {
    carouselWrapper.insertAdjacentHTML(
        'beforeend',
        Mustache.render(slideTemplate, slideData)
    );
});

const carousel = new Flickity('.main-carousel', {
    hash: true,
    freeScroll: true,
    wrapAround: true,
    on: {
        ready: function () {
            const currentSlideIndex = this.selectedIndex;
            const slidesCount = this.slides.length;
            progressBar.style.width = currentSlideIndex / (slidesCount - 1) * 100 + "%";
        }
    }
});

const resetSlides = () => {
    carousel.select(0);
};

const adjustProgressBarWidth = progress => {
    progressBar.style.width = progress * 100 + "%";
}

resetBtn.addEventListener("click", resetSlides);
carousel.on('scroll', function (progress) {
    adjustProgressBarWidth(progress)
});
