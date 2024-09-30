class CompareItemButton extends HTMLElement {
  constructor () {
    super();
    this.stickyCompare = document.querySelector('sticky-compare')
    this.stickyCompareCount = document.querySelector('sticky-compare-count');
    this.stickyCompareProductImages = document.querySelector('sticky-compare-product-images');

    this.addEventListener(('click'), () => {
      this.classList.toggle('variant-item__compare-button--compare');

      // Grab how many compare buttons have been clicked
      const itemsToCompareButtons = document.querySelectorAll('.variant-item__compare-button--compare');
      if (itemsToCompareButtons.length > 1) {
        // Show compare sticky bar
        this.stickyCompare.classList.remove('hidden');

        // Update how many items to compare count
        this.stickyCompareCount.innerHTML = itemsToCompareButtons.length;

        // Add product images and name to the sticky compare bar
        // Clear out the images initially
        this.stickyCompareProductImages.innerHTML = '';
        itemsToCompareButtons.forEach((itemToCompareButton) => {
          const itemImage = itemToCompareButton.getAttribute('data-compare-pdp-image');
          const itemName = itemToCompareButton.closest('.variant-item')?.querySelector('.variant-item__name').textContent;
          const itemImageHTML = `<div class='twcss-flex twcss-justify-center twcss-gap-2 twcss-flex-col twcss-border-gray-200 twcss-border sticky-compare__item'>
                                  <img class='twcss-flex twcss-self-center' src='${itemImage}' alt='${itemName}'>
                                  <span class='twcss-text-base twcss-text-center'>
                                    ${itemName}
                                  </span>
                                </div>`;
          this.stickyCompareProductImages.insertAdjacentHTML('beforeend', itemImageHTML);
        });
      } else {
        // Hide compare sticky bar
        this.stickyCompare.classList.add('hidden');
      }
    });
  }
}

customElements.define('compare-product-button', CompareItemButton);

class StickyCompareButton extends HTMLElement {
  constructor () {
    super();
    this.compareModal = document.querySelector('compare-modal');
    this.compareModalItemsContainer = document.querySelector('compare-modal-items');
    this.itemsToCompareIDs = []

    this.addEventListener(('click'), () => {
      this.grabItemsToCompareIDs();
      this.populateCompareModal();
      this.openCompareModal();
    });
  }

  grabItemsToCompareIDs() {
    const itemsToCompareButtons = document.querySelectorAll('.variant-item__compare-button--compare');

    itemsToCompareButtons.forEach((itemsToCompareButton) => {
      const itemID = itemsToCompareButton.closest('.variant-item').getAttribute('data-variant-id');
      this.itemsToCompareIDs.push(itemID);
    });
  }

  populateCompareModal() {
    const productVariants = productJSON.variants;

    // Grab compare item ids that will be used to populate the modal
    this.itemsToCompareIDs.forEach((itemsToCompareID) => {
      const variantItem = productVariants.find((variant) => { 
        return variant.id === parseInt(itemsToCompareID)
      });
      this.buildCompareModalItem(variantItem);
    });
  }

  buildCompareModalItem(item) {

  }

  openCompareModal() {

  }
}

customElements.define('sticky-compare-button', StickyCompareButton);