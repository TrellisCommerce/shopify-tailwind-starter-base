document.addEventListener('DOMContentLoaded', function () {
  const sliderElement = document.querySelector('.custom-slider');
  const slides = sliderElement.querySelectorAll('.slide');
  const prevButton = sliderElement.querySelector('.prev-button');
  const nextButton = sliderElement.querySelector('.next-button');

  const slider = {
    slides: slides,
    currentIndex: 0,
  };

  updateSlideNumber(slider); 

  function updateSlider(slider) {
    slider.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${slider.currentIndex * 100}%)`;
    });

    navButtons.forEach((navButton) => {
      navButton.classList.remove('active');
    });
    navButtons[slider.currentIndex].classList.add('active');
  }

  function updateSlideNumber(slider) {
    const slideNumberElement = document.querySelector('.slide-number');
    const currentSlide = slider.currentIndex + 1;
    const totalSlides = slider.slides.length;

    const formattedCurrentSlide = currentSlide < 10 ? `0${currentSlide}` : currentSlide;
    const formattedTotalSlides = totalSlides < 10 ? `0${totalSlides}` : totalSlides;

    slideNumberElement.textContent = `${formattedCurrentSlide}/${formattedTotalSlides}`;
  }

  function changeSlide(slider, change) {
    slider.currentIndex += change;

    if (slider.currentIndex < 0) {
      slider.currentIndex = slider.slides.length - 1;
    } else if (slider.currentIndex >= slider.slides.length) {
      slider.currentIndex = 0;
    }

    updateSlider(slider);
    updateSlideNumber(slider); 
  }

  function navigateToSlide(slider, index) {
    slider.currentIndex = index;
    updateSlider(slider);
  }

  prevButton.addEventListener('click', function () {
    changeSlide(slider, -1);
  });

  nextButton.addEventListener('click', function () {
    changeSlide(slider, 1);
  });

  const navButtons = sliderElement.querySelectorAll('.nav-button');
  navButtons.forEach((navButton, index) => {
    navButton.addEventListener('click', function () {
      navigateToSlide(slider, index);
    });
  });

  navButtons[0].classList.add('active');

  // Draggable functionality
  let pointerStartX = null;

  function handlePointerDown(event) {
    pointerStartX = event.clientX || event.touches[0].clientX;
  }

  function handlePointerUp(event) {
    const pointerEndX = event.clientX || event.changedTouches[0].clientX;

    if (pointerStartX && Math.abs(pointerStartX - pointerEndX) > 50) {
      if (pointerStartX > pointerEndX) {
        changeSlide(slider, 1);
      } else {
        changeSlide(slider, -1);
      }
    }

    pointerStartX = null;
  }

  sliderElement.addEventListener('mousedown', handlePointerDown);
  sliderElement.addEventListener('mouseup', handlePointerUp);
  sliderElement.addEventListener('touchstart', handlePointerDown);
  sliderElement.addEventListener('touchend', handlePointerUp);
});