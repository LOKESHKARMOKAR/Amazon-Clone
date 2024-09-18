import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    
    const matchingProduct = getProduct(productId);
    

    const deliveryOptionId = cartItem.deliveryOptionsId;

    const deliveryoption = getDeliveryOption(deliveryOptionId);
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOptions.deliveryDate, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ₹${matchingProduct.priceCents}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span data-product-id = "${
                    matchingProduct.id
                  }" class="delete-quantity-link link-primary js-delete-link">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOptions.deliveryDate, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        option.priceCents === 0 ? "FREE" : `₹${option.priceCents}`;

      //checking option
      const IsChecked = deliveryOptions.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option data-delivery-option-id="${
        deliveryOptions.id
      }" data-product-id="${matchingProduct.id}"">
        <input type="radio" ${IsChecked ? "cheked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} shipping
          </div>
        </div>
      </div>
    `;
    });
    return html;
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOptions(productId, deliveryOptionId);
      
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}



