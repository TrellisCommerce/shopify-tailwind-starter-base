class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content =
      this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener(
      'focusout',
      this.onFocusOut.bind(this),
    );
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle
      .querySelector('summary')
      .setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.megaMenu = document.querySelector('.mega-menu');
  }

  onToggle() {
    if (this.megaMenu) {
      var parentLinks = document.querySelectorAll('details.mega-menu');
      parentLinks.forEach(function (parentLink) {
        loadImages(parentLink);
      });
      function loadImages(menuItem) {
        var images = menuItem.querySelectorAll('.custom-lazyload');
        if (!images.length) return;
        images.forEach(function (image) {
          if (image.dataset.src) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
            image.classList.remove('custom-lazyload');
          }
        });
      }
    }

    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (
      document.documentElement.style.getPropertyValue(
        '--header-bottom-position-desktop',
      ) !== ''
    )
      return;
    document.documentElement.style.setProperty(
      '--header-bottom-position-desktop',
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`,
    );
  }
}

customElements.define('header-menu', HeaderMenu);
