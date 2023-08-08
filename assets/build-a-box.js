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

  let currentPlan = 689522049319;

  function getVariantItems() {
    const variantElements = document.getElementsByClassName('variant');
    let itemsToAdd = [];

    for (let i = 0; i < variantElements.length; i++) {
      const variantElement = variantElements[i];
      const variantId =
        variantElement.getElementsByClassName('variant-id')[0].value;
      const quantity =
        variantElement.getElementsByClassName('variant-quantity')[0].value;

      if (parseInt(quantity) > 0) {
        itemsToAdd.push({
          id: variantId,
          quantity: quantity,
          selling_plan: currentPlan,
        });
      }
    }
    return itemsToAdd;
  }

  function calculateTotal() {
    const itemsToAdd = getVariantItems();
    let totalPrice = 0;
    let totalPriceOriginal = 0;
    let totalQuantity = 0;
    let itemPrices = [];

    for (let i = 0; i < itemsToAdd.length; i++) {
      const item = itemsToAdd[i];
      const variant = window.ur_subscription_variants[item.id];
      let itemPriceOriginal = variant.price;
      if (variant.compare_at_price) {
        itemPriceOriginal = variant.compare_at_price;
      }
      let itemPrice = itemPriceOriginal;

      if (currentPlan) {
        if (currentPlan != '') {
          for (let j = 0; j < variant.selling_plan_allocations.length; j++) {
            const plan = variant.selling_plan_allocations[j];
            if (plan.selling_plan_id == currentPlan) {
              itemPrice = plan.price;
            }
          }
        }
      }
      totalPriceOriginal =
        totalPriceOriginal + itemPriceOriginal * item.quantity;
      totalPrice = totalPrice + itemPrice * item.quantity;
      totalQuantity = totalQuantity + parseInt(item.quantity);
      itemPrices.push(itemPrice);
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
    singleItemPriceElement.innerHTML = (itemPrices[0] / 100).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    );
  }
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

      const variants = document.getElementsByClassName('ur-variant');

      let countCurrentVariant = 0;
      for (let k = 0; k < variants.length; k++) {
        const variant = variants[k];

        // If variant has the same data-option value as the clicked button,
        // remove 'hidden' class. Otherwise, add 'hidden' class and set quantity to 0.
        if (variant.getAttribute('data-option') === clickedOption) {
          variant.classList.remove('xhidden');
        } else {
          variant.classList.add('xhidden');

          // Find the quantity input within the hidden variant and set its value to 0
          var quantityInput = variant.querySelector('.variant-quantity');
          if (quantityInput) {
            quantityInput.value = 0;
          }
        }
      }

      calculateTotal();
    });
  }
});
