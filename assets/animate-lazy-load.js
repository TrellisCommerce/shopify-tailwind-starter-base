// element seemingly fades in to view on scroll
const fadeincallback = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('twcss-animate-fadeIn');
    } else {
      entry.target.classList.remove('twcss-animate-fadeIn');
    }
  });
};

// adds the same animation duration for all animated elements if globally set
const animationdurationcallback = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty(
        'animation-duration',
        `${document.body.getAttribute('data-animation-duration')}ms`,
        'important',
      );
      entry.target.style.setProperty(
        'animation-timing-function',
        `${document.body.getAttribute('data-animation-easing')}`,
        'important',
      );
    }
  });
};

const fadeinobserver = new IntersectionObserver(fadeincallback);

const animationdurationobserver = new IntersectionObserver(
  animationdurationcallback,
);

// targets any elements with the show-on-scroll class
const fadeintargets = document.querySelectorAll('.show-on-scroll');
fadeintargets.forEach(function (target) {
  target.style.opacity = '0';
  fadeinobserver.observe(target);
});

// targets any elements with a Tailwind or Dawn animation class
const animationdurationtargets = document.querySelectorAll(
  '[class*=twcss-animate-], [class*=animate--]',
);
animationdurationtargets.forEach(function (target) {
  animationdurationobserver.observe(target);
});
