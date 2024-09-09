import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productHtml = "";

products.forEach((product) => {
  productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
    
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
    
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>
    
          <div class="product-price">
            ₹${product.priceCents}
          </div>
    
          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
    
          <div class="product-spacer"></div>
    
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
    
          <button class="add-to-cart-button button-primary js-add-to-cart-button " data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});
// diplay on the web page
document.querySelector(".js-products-grid").innerHTML = productHtml;

function updateQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.Quantity;
  });
  document.querySelector(".js-add-to-cart-quantity").innerHTML = cartQuantity;
}

// querySelectorAll()   means every button display on the web page
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    // this function created in the cart folder
    addToCart(productId);
    // function call
    updateQuantity();
  });
});
