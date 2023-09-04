document.addEventListener('DOMContentLoaded', function () {
  // Select all buttons
  const optionButtons = document.getElementsByClassName('option-btn');
  const planButtons = document.getElementsByClassName('plan-selector-btn');
  const priceTotalElement = document.querySelector('.price-total');
  const priceTotalCompareAtContainer = document.querySelector(
    '.price-display-compare',
  );
  const priceTotalCompareAtElement =
    document.querySelector('.price-compare-at');
  const quantityTotalElement = document.querySelector('.total-quantity-couunt');
  const singleItemPriceElement = document.querySelector(
    '.single-item-price-count',
  );
  const unitPriceDisplayElement = document.querySelector('.unit-price-display');
  const quantityBreakCounterElement = document.querySelector(
    '.quantity-break-counter',
  );
  const quantityBreakProgressBar = document.querySelector(
    '.quantity-break-progress-bar',
  );
  const quantityBreakTargetElement = document.querySelector(
    '.quantity-break-target',
  );
  const quantityBreakAppliedElement = document.querySelector(
    '.quantity-break-applied',
  );

  let currentPlan = parseInt(window.ur_subscription_plan);
  let quantityBreakTarget = parseInt(window.ur_quantity_break_target);

  function getVariantItems() {
    const variantElements = document.getElementsByClassName('variant');
    let itemsToAdd = [];

    for (let i = 0; i < variantElements.length; i++) {
      const variantElement = variantElements[i];
      const variantId =
        variantElement.getElementsByClassName('variant-id')[0].value;
      const quantity =
        variantElement.getElementsByClassName('variant-quantity')[0].value;

      itemsToAdd.push({
        id: variantId,
        quantity: quantity,
        selling_plan: currentPlan,
      });
    }
    return itemsToAdd;
  }

  function calculateTotal() {
    const itemsToAdd = getVariantItems();
    let totalPrice = 0;
    let totalPriceOriginal = 0;
    let totalQuantity = 0;
    let singleItemPrice = 0;
    let unitPrice = 0;

    for (let i = 0; i < itemsToAdd.length; i++) {
      const item = itemsToAdd[i];
      const variant = window.ur_subscription_variants[item.id];
      let itemPriceOriginal = variant.price;
      if (variant.compare_at_price) {
        itemPriceOriginal = variant.compare_at_price;
      }
      let itemPrice = itemPriceOriginal;
      if (variant.option1 === window.ur_selected_variant_option) {
        singleItemPrice = itemPrice;
        unitPrice = variant.unit_price;
      }

      if (currentPlan) {
        if (currentPlan != '') {
          for (let j = 0; j < variant.selling_plan_allocations.length; j++) {
            const plan = variant.selling_plan_allocations[j];
            if (plan.selling_plan_id == currentPlan) {
              itemPrice = plan.price;
              if (variant.option1 === window.ur_selected_variant_option) {
                singleItemPrice = plan.price;
              }
            }
          }
        }
      }
      totalPriceOriginal =
        totalPriceOriginal + itemPriceOriginal * item.quantity;
      totalPrice = totalPrice + itemPrice * item.quantity;
      totalQuantity = totalQuantity + parseInt(item.quantity);
    }

    const quantityBreakCounter = quantityBreakTarget - totalQuantity;
    if (quantityBreakCounter > 0) {
      quantityBreakCounterElement.innerHTML = quantityBreakCounter;
      const percent = Math.floor((totalQuantity / quantityBreakTarget) * 100);
      quantityBreakProgressBar.style.width = percent + '%';
      quantityBreakTargetElement.classList.remove('xhidden');
      quantityBreakAppliedElement.classList.add('xhidden');
    } else {
      quantityBreakTargetElement.classList.add('xhidden');
      quantityBreakAppliedElement.classList.remove('xhidden');
      totalPrice = totalPrice - totalPrice * 0.05;
    }

    priceTotalElement.innerHTML = (totalPrice / 100).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    if (totalPrice != totalPriceOriginal) {
      priceTotalCompareAtContainer.classList.remove('xhidden');
      priceTotalCompareAtElement.innerHTML = (
        totalPriceOriginal / 100
      ).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    } else {
      priceTotalCompareAtContainer.classList.add('xhidden');
    }
    quantityTotalElement.innerHTML = totalQuantity;
    singleItemPriceElement.innerHTML = (singleItemPrice / 100).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    );

    let unitPriceFormat = (unitPrice / 100).toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    unitPriceDisplayElement.innerHTML = unitPriceFormat;
  }
  //Calculate Total on Start
  calculateTotal();

  //Send Cart Form
  document
    .getElementById('add-box-to-cart-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      itemsToAdd = getVariantItems();

      const data = {
        items: itemsToAdd,
      };

      console.log(data);

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          window.location.href = '/cart';
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation: ',
            error,
          );
        });
    });

  function decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]',
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    if (value >= 0) {
      target.value = value;
      calculateTotal();
    }
  }

  function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]',
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
    calculateTotal();
  }

  const decrementButtons = document.querySelectorAll(
    `button[data-action="decrement"]`,
  );

  const incrementButtons = document.querySelectorAll(
    `button[data-action="increment"]`,
  );

  decrementButtons.forEach((btn) => {
    btn.addEventListener('click', decrement);
  });

  incrementButtons.forEach((btn) => {
    btn.addEventListener('click', increment);
  });

  // Selling Plan Buttons
  for (let i = 0; i < planButtons.length; i++) {
    planButtons[i].addEventListener('click', function (event) {
      currentPlan = this.getAttribute('data-plan');
      for (var j = 0; j < planButtons.length; j++) {
        planButtons[j].classList.remove('active');
      }
      this.classList.add('active');
      calculateTotal();
    });
  }

  // Variant Option Buttons
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', function (event) {
      for (let j = 0; j < optionButtons.length; j++) {
        optionButtons[j].classList.remove('active');
      }
      this.classList.add('active');

      const clickedOption = this.getAttribute('data-option');
      window.ur_selected_variant_option = clickedOption;

      const products = document.getElementsByClassName('ur-product');

      for (let k = 0; k < products.length; k++) {
        const product = products[k];
        const variants = product.getElementsByClassName('ur-variant');

        let highestQuantity = 0;
        for (let l = 0; l < variants.length; l++) {
          const variant = variants[l];
          const quantity = variant.querySelector('.variant-quantity').value;
          if (quantity > highestQuantity) {
            highestQuantity = quantity;
          }
        }

        for (let l = 0; l < variants.length; l++) {
          const variant = variants[l];
          const quantityElement = variant.querySelector('.variant-quantity');
          if (variant.getAttribute('data-option') === clickedOption) {
            variant.classList.remove('xhidden');
            if (quantityElement) {
              quantityElement.value = highestQuantity;
            }
          } else {
            variant.classList.add('xhidden');
            if (quantityElement) {
              quantityElement.value = 0;
            }
          }
        }
      }

      calculateTotal();
    });
  }

  //Input listener
  document
    .querySelector('#add-box-to-cart-form')
    .addEventListener('input', function (event) {
      if (event.target.matches('input, select, textarea')) {
        calculateTotal();
      }
    });

  const swiperConfig = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    initialSlide: 2,
    spaceBetween: -50,
    loop: true,
    loopAdditionalSlides: 6,
    coverflowEffect: {
      rotate: 0,
      stretch: 280,
      depth: 700,
      modifier: 1.8,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  //Swiper Init
  const swiper = new Swiper('.ur-bab-swiper', swiperConfig);

  const productElements = document.querySelectorAll('.ur-product');
  productElements.forEach((product) => {
    product.addEventListener('click', function () {
      const productIndex =
        parseInt(product.getAttribute('data-product-index')) - 1;
      swiper.slideToLoop(productIndex, 400, true);
    });
  });

  //Footer
  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    let top = rect.top + window.scrollY;
    let left = rect.left + window.scrollX;
    return { top, left };
  }

  // Get the element
  const footer = document.querySelector('.ur-form-footer');

  if (footer) {
    const position = getOffset(footer);
    // Now, position the footer as absolute
    footer.style.bottom = '0';
    footer.style.left = position.left + 'px';
    footer.style.position = 'sticky';
  }
});
