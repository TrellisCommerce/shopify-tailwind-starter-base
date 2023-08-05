document.addEventListener('DOMContentLoaded', function () {
  // Select all buttons
  var optionButtons = document.getElementsByClassName('option-btn');

  for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener('click', function (event) {
      // Remove 'active' class from all buttons
      for (var j = 0; j < optionButtons.length; j++) {
        optionButtons[j].classList.remove('active');
      }

      // Add 'active' class to clicked button
      this.classList.add('active');

      // Get data-option value of clicked button
      var clickedOption = this.getAttribute('data-option');

      // Select all .ur-variant elements
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
    });
  }

  document
    .getElementById('add-box-to-cart-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      var variantElements = document.getElementsByClassName('variant');
      var itemsToAdd = [];

      for (var i = 0; i < variantElements.length; i++) {
        var variantElement = variantElements[i];
        var variantId =
          variantElement.getElementsByClassName('variant-id')[0].value;
        var quantity =
          variantElement.getElementsByClassName('variant-quantity')[0].value;
        var sellingPlan = variantElement.getElementsByClassName(
          'variant-selling-plan',
        )[0];
        var sellingPlanId = sellingPlan ? sellingPlan.value : null; // fetch the selected selling plan

        itemsToAdd.push({
          id: variantId,
          quantity: quantity,
          selling_plan: 689522049319, // add the selected selling plan ID to the AJAX request data
        });
      }

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
});
