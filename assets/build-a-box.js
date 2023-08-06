document.addEventListener('DOMContentLoaded', function () {
  // Select all buttons
  var optionButtons = document.getElementsByClassName('option-btn');
  var planButtons = document.getElementsByClassName('plan-selector-btn');

  var currentPlan = 689522049319;

  function getVariantItems() {
    var variantElements = document.getElementsByClassName('variant');
    var itemsToAdd = [];

    for (var i = 0; i < variantElements.length; i++) {
      var variantElement = variantElements[i];
      var variantId =
        variantElement.getElementsByClassName('variant-id')[0].value;
      var quantity =
        variantElement.getElementsByClassName('variant-quantity')[0].value;

      itemsToAdd.push({
        id: variantId,
        quantity: quantity,
        selling_plan: currentPlan,
      });
    }
    return itemsToAdd;
  }

  const priceTotalElement = document.querySelector('.price-total');

  function calculateTotal() {
    const itemsToAdd = getVariantItems();
    console.log('calculating price');
    let totalPrice = 0;
    let totalPriceOriginal = 0;
    for (let i = 0; i < itemsToAdd.length; i++) {
      const item = itemsToAdd[i];
      const variant = window.ur_subscription_variants[item.id];
      let itemPriceOriginal = variant.price * item.quantity;
      let itemPrice = itemPriceOriginal;

      console.log(variant);

      if (currentPlan) {
        if (currentPlan != '') {
          console.log(currentPlan);
          for (let j = 0; j < variant.selling_plan_allocations.length; j++) {
            const plan = variant.selling_plan_allocations[j];
            console.log(plan);
            if (plan.selling_plan_id == currentPlan) {
              itemPrice = plan.price * item.quantity;
            }
          }
        }
      }

      totalPriceOriginal = totalPriceOriginal + itemPriceOriginal;
      totalPrice = totalPrice + itemPrice;
    }
    totalPriceOriginal = totalPriceOriginal / 100;
    totalPrice = totalPrice / 100;
    priceTotalElement.innerHTML = totalPrice.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }

  //Send Cart Form
  document
    .getElementById('add-box-to-cart-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      itemsToAdd = getVariantItems();

      var data = {
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
    target.value = value;
    calculateTotal();
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
  for (var i = 0; i < planButtons.length; i++) {
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
  for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', function (event) {
      for (var j = 0; j < optionButtons.length; j++) {
        optionButtons[j].classList.remove('active');
      }
      this.classList.add('active');

      var clickedOption = this.getAttribute('data-option');

      var variants = document.getElementsByClassName('ur-variant');

      for (var k = 0; k < variants.length; k++) {
        var variant = variants[k];

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
