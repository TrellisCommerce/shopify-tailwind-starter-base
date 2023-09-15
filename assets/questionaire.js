document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      // 'Enter' key was pressed
      event.preventDefault();
      tryNext();
    }
  });

  const nextBtn = document.querySelector('.qur-next');
  const prevBtn = document.querySelector('.qur-prev');
  nextBtn.addEventListener('click', tryNext);
  prevBtn.addEventListener('click', back);

  function tryNext() {
    // Find the current active slide
    const currentActiveSlide = document.querySelector('[data-active="true"]');
    if (validate(currentActiveSlide)) next(currentActiveSlide);
  }

  function validate(currentSlide) {
    // Find all form elements inside the given slide
    const forms = currentSlide.querySelectorAll('form');

    // Assume the slide is valid initially
    let isValid = true;

    // Loop through each form to validate
    for (let form of forms) {
      // If the form is invalid
      if (!form.checkValidity()) {
        // Display native error messages
        form.reportValidity();
        isValid = false; // Update validity flag
        break; // Exit loop at first invalid form
      }
    }

    // Return whether the slide (all forms in it) is valid or not
    return isValid;
  }

  function next(currentActiveSlide) {
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

      prevBtn.classList.remove('!xhidden');

      // If there's a next slide, set it to active and show it
      if (nextSlide) {
        nextSlide.setAttribute('data-active', 'true');
        nextSlide.classList.remove('xhidden');
      }
    }
  }

  function back() {
    const currentActiveSlide = document.querySelector('[data-active="true"]');
    // If an active slide is found, proceed
    if (currentActiveSlide) {
      // Set its active status to false and hide it
      currentActiveSlide.setAttribute('data-active', 'false');
      currentActiveSlide.classList.add('xhidden');

      // Get the previous slide index
      const prevSlideIndex =
        parseInt(currentActiveSlide.getAttribute('data-slide'), 10) - 1;
      const prevSlide = document.querySelector(
        `[data-slide="${prevSlideIndex}"]`,
      );

      // If there's a previous slide, set it to active and show it
      if (prevSlide) {
        prevSlide.setAttribute('data-active', 'true');
        prevSlide.classList.remove('xhidden');
      }

      // If we're at the first slide after moving back, hide the 'back' button
      if (prevSlideIndex === 1) {
        prevBtn.classList.add('!xhidden');
      }
    }
  }
});
