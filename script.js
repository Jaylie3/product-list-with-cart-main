// Get the cart container and cart list elements
const cartContainer = document.querySelector('.cart-container');
const cartList = document.querySelector('.cart-list');
const cartQuantity = document.querySelector('.cart-quantity');
const clearCartButton = document.querySelector('.clear-cart');
const confirmOrderButton = document.querySelector('.confirm-order');
const modal = document.querySelector('.modal');

// Initialize an empty cart
let cart = [];

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', event => {
    const productId = event.target.dataset.id;
    const product = {
      id: productId,
      name: event.target.parentNode.querySelector('h2').textContent,
      price: event.target.parentNode.querySelector('p:nth-child(3)').textContent
    };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      // Update the quantity of the existing product
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      // Add the product to the cart
      cart.push({ ...product, quantity: 1 });
    }

    updateCart();
  });
});

// Update the cart display
function updateCart() {
  cartList.innerHTML = '';
  cart.forEach(product => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${product.name} x ${product.quantity} - ${product.price}`;
    cartList.appendChild(cartItem);
  });
  cartQuantity.textContent = cart.length;

  // Calculate the total cost
  const totalCost = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const totalCostElement = document.createElement('p');
  totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;
  cartList.appendChild(totalCostElement);
}

// Clear the cart
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Confirm the order
confirmOrderButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Please add products to the cart before confirming the order.');
    return;
  }

  modal.classList.add('show-modal');
});

// Close the modal
modal.addEventListener('click', event => {
  if (event.target === modal) {
    modal.classList.remove('show-modal');
  }
});