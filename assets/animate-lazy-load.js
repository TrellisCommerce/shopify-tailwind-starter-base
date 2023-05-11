const callback = function (entries) {
  entries.forEach((entry) => {
    console.log(entry);

    if (entry.isIntersecting) {
      entry.target.classList.add('twcss-animate-fadeIn');
    } else {
      entry.target.classList.remove('twcss-animate-fadeIn');
    }
  });
};

const observer = new IntersectionObserver(callback);

const targets = document.querySelectorAll('.show-on-scroll');
targets.forEach(function (target) {
  target.style.opacity = '0';
  observer.observe(target);
});
