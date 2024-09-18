// get the cart from local storage

import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity: 2,
    deliveryOptionsId: '1' // Fixed typo
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity: 1,
    deliveryOptionsId: '2' // Fixed typo
  },
];

// use local storage to save our cart data
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId == item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.Quantity += 1;
    saveToStorage(); // Save updated quantity to storage
  } else {
    cart.push({
      productId: productId,
      Quantity: 1,
      deliveryOptionsId: '1'
    });
    saveToStorage();
  }
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionsId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId == item.productId) {
      matchingItem = item;
    }
  });

 
    matchingItem.deliveryOptionsId = deliveryOptionsId;
    saveToStorage();
  
}
