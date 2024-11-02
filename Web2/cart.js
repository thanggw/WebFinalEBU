let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.name} - ${item.price} x ${item.quantity}</p>
      <button onclick="removeItem(${index})">Xóa</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();