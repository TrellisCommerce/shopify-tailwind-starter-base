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
          const itemID = itemToCompareButton.closest('.variant-item').getAttribute('data-variant-id');
          const itemImageHTML = `<div class='twcss-flex twcss-justify-center twcss-gap-2 twcss-flex-col twcss-border-gray-200 twcss-border sticky-compare__item' data-id='${itemID}'>
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
    this.stickyCompareButtonItemCount = this.querySelector('sticky-compare-count');
    this.stickyCompare = document.querySelector('sticky-compare')
    this.compareModalOverlay = document.querySelector('compare-modal-overlay')
    this.compareModal = document.querySelector('compare-modal');
    this.compareModalItemsContainer = document.querySelector('compare-modal-items');
    this.compareModalCloseButtons = document.querySelectorAll('.compare-modal__close')
    this.itemsToCompareIDs = []

    this.addEventListener(('click'), () => {
      this.initCompareModal();
    });
  }

  initCompareModal() {
    this.grabItemsToCompareIDs();
    this.populateCompareModal();
    this.openCompareModal();
    
    this.compareModalCloseButtons.forEach((modalCloseButton) => {
      modalCloseButton.addEventListener(('click'), () => {
        this.closeCompareModal();
      });
    })
  }

  grabItemsToCompareIDs() {
    // Clear out existing id's
    this.itemsToCompareIDs = [];

    const itemsToCompareButtons = document.querySelectorAll('.variant-item__compare-button--compare');

    itemsToCompareButtons.forEach((itemsToCompareButton) => {
      const itemID = itemsToCompareButton.closest('.variant-item').getAttribute('data-variant-id');
      this.itemsToCompareIDs.push(itemID);
    });
  }

  populateCompareModal() {
    // Clear out modal variants 
    this.compareModalItemsContainer.innerHTML = '';

    const productVariants = productJSON.variants;

    // Grab compare item ids that will be used to populate the modal
    this.itemsToCompareIDs.forEach((itemsToCompareID) => {
      const variantItem = productVariants.find((variant) => { 
        return variant.id === parseInt(itemsToCompareID)
      });
      this.buildCompareModalItem(variantItem);
      this.compareModalItemRemove();
      this.addCompareItemToCart();
    });
  }

  buildCompareModalItem(item) {
    const itemTitle = item.name;
    const itemVariantTitle = item.title;
    const itemPrice = item.price;
    const itemImage = item.featured_image.src;
    const itemImageAlt = item.featured_image.alt;
    const itemSku = item.sku;
    const itemID = item.id;

    // Format the price
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: `${Shopify.currency.active}`,
      trailingZeroDisplay: 'stripIfInteger'
    });

    const itemHTML = `<div class="compare-variant-item__item twcss-flex-1 twcss-basis-1/2 twcss-flex twcss-flex-col">
                        <button aria-label='Remove item from Comparison table' class="compare-variant-item__remove twcss-text-5xl twcss-ml-auto twcss-mb-4" data-id='${itemID}'>&times</button>
                        <div class="compare-variant-item__image twcss-mb-4">
                          <img class="twcss-aspect-square" src="${itemImage}" alt="${itemImageAlt}">
                        </div>
                        <div class="compare-variant-item__details twcss-flex twcss-flex-col twcss-gap-2">
                          <div class="compare-variant-item__title">
                            ${itemTitle}
                          </div>
                          <div class="compare-variant-item__variant">
                            ${itemVariantTitle}
                          </div>
                          ${ itemSku ? `<div class="compare-variant-item__sku">${itemSku}</div>` : ''}
                          <div class="compare-variant-item__price">
                            ${(formatter.format(itemPrice / 100))}
                          </div>
                          ${item.available === true ? this.addQtyToCompareItem(itemTitle, itemID) : '<p>Out of Stock</p>'}
                          ${item.available === true ? `<button class="compare-variant-item__button button button--primary" aria-label="Add ${itemTitle} to cart">Add to Cart</button>` : ''}
                        </div>
                    </div>`;

    this.compareModalItemsContainer.insertAdjacentHTML('beforeend', itemHTML)
  }

  addQtyToCompareItem(itemTitle, itemID) {
    return `<div class="compare-variant-item__qty">
              <quantity-input class="quantity cart-quantity">
                <button class="quantity__button" name="minus" type="button">
                  <span class="visually-hidden">Decrease quantity for ${itemTitle}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor">
                  </path></svg>
                </button>
                <input class="quantity__input" data-quantity-variant-id="${itemID}" type="number" name="updates[]" value="1" data-cart-quantity="1" min="1" data-min="1" step="1" aria-label="Quantity for ${itemTitle}" id="Quantity-${itemID}" data-index="${itemID}">
                <button class="quantity__button" name="plus" type="button">
                  <span class="visually-hidden">Increase quantity for ${itemTitle}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor">
                  </path></svg>
                </button>
              </quantity-input>
            </div>`
  }

  addCompareItemToCart() {
    const compareVariantsAddToCart = document.querySelectorAll('.compare-variant-item__button');
    compareVariantsAddToCart.forEach((compareVariantAddToCart) => {
      compareVariantAddToCart.addEventListener(('click'), () => {
        // Grab qty and id
        const qtyInput = compareVariantAddToCart.closest('.compare-variant-item__details').querySelector('.quantity__input');
        const qty = parseInt(qtyInput.value);
        const variantID = parseInt(qtyInput.getAttribute('data-index'));

        const updates = {
          'items': [{
           'id': variantID,
           'quantity': qty
          }]
        };

        // Add item to cart
        fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updates)
        })
        .then(response => {
          compareVariantAddToCart.innerHTML = 'Added!';

          setTimeout(() => {
            compareVariantAddToCart.innerHTML = 'Add to Cart';
          },5000);
          
          return response.json();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    });
  }

  compareModalItemRemove() {
    const compareItemsRemove = this.compareModal.querySelectorAll('.compare-variant-item__remove');

    compareItemsRemove.forEach((compareItemRemove) => {
      compareItemRemove.addEventListener(('click'), () => {
        // Grab item to removes ID
        const compareItemID = compareItemRemove.getAttribute('data-id');

        // Remove from sticky bar
        const stickyCompareItem = document.querySelector(`.sticky-compare__item[data-id="${compareItemID}"]`);
        if (stickyCompareItem) stickyCompareItem.remove();

        // Uncheck compare item
        const compareItemToUncheck = document.querySelector(`.variant-item[data-variant-id="${compareItemID}"] .variant-item__compare-button--compare`);
        if(compareItemToUncheck) compareItemToUncheck.classList.remove('variant-item__compare-button--compare');

        // Remove from modal
        compareItemRemove.closest('.compare-variant-item__item').remove();

        // Check if there is only one item in the compare modal left
        const compareItems = this.compareModal.querySelectorAll('.compare-variant-item__item');
        if (compareItems.length === 1) {
          this.closeCompareModal();

          this.stickyCompare.classList.add('hidden');
        }

        // Update the sticky button count
        this.stickyCompareButtonItemCount.innerHTML = compareItems.length;
      });
    })
  }

  openCompareModal() {
    this.compareModal.classList.remove('twcss-hidden');
    this.compareModalOverlay.classList.remove('twcss-hidden');
  }

  closeCompareModal() {
    this.compareModal.classList.add('twcss-hidden');
    this.compareModalOverlay.classList.add('twcss-hidden');
  }
}

customElements.define('sticky-compare-button', StickyCompareButton);