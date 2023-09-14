document.addEventListener('DOMContentLoaded', function () {
  const nextBtn = document.querySelector('.qur-next');

  nextBtn.addEventListener('click', function () {
    // Find the current active slide
    const currentActiveSlide = document.querySelector('[data-active="true"]');

    // If an active slide is found, proceed
    if (currentActiveSlide) {
      // Set its active status to false and hide it
      currentActiveSlide.setAttribute('data-active', 'false');
      currentActiveSlide.classList.add('xhidden');

      // Get the next slide
      const nextSlideIndex =
        parseInt(currentActiveSlide.getAttribute('data-slide')) + 1;
      const nextSlide = document.querySelector(
        `[data-slide="${nextSlideIndex}"]`,
      );

      // If there's a next slide, set it to active and show it
      if (nextSlide) {
        nextSlide.setAttribute('data-active', 'true');
        nextSlide.classList.remove('xhidden');
      }
    }
  });
});
