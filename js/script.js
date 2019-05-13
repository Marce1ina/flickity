let carousel;
const progressBar = document.querySelector(".progress-bar");

const renderSlides = () => {
    const carouselWrapper = document.getElementById("carousel-wrapper");
    const slideTemplate = document.getElementById('template-slide').innerHTML;
    Mustache.parse(slideTemplate);

    slidesData.forEach(slideData => {
        carouselWrapper.insertAdjacentHTML(
            'beforeend',
            Mustache.render(slideTemplate, slideData)
        );
    });
}

const renderCarousel = () => new Flickity('.main-carousel', {
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
    const currentSlideIndex = carousel.selectedIndex;
    const slidesCount = carousel.slides.length;
    progressBar.style.width = currentSlideIndex / (slidesCount - 1) * 100 + "%";

    progressBar.style.width = progress * 100 + "%";
}

const initialize = (() => {
    renderSlides();

    carousel = renderCarousel();

    document.querySelector(".reset-btn").addEventListener("click", resetSlides);

    window.initMap = () => {
        const map = new google.maps.Map(
          document.getElementById('map'), {
                zoom: 10,
                center: slidesData.find(
                    slideData => slideData.id === carousel.selectedElement.id
                ).coords
            }
        );

        slidesData.forEach(slideData => {
            new google.maps.Marker({
                position: slideData.coords,
                map: map
            });
        });
    }

    carousel.on('scroll', function (progress) {
        adjustProgressBarWidth(progress);
    });
})();
