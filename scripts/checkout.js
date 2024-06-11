import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import  formatCurrency  from './utils/money.js';
import  dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';


let summaryHtml = '';
const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMM, D'))

  cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
  const matchingProduct = products.find((product)=> product.id === productId);
  // let matchingProduct;
  // products.forEach((product)=> {
  //   if(product.id === productId){
  //     matchingProduct = product;
  //   }
  // });
const index = cart.indexOf(cartItem);

const deliveryOptionId = cartItem.deliveryOptionId;
const deliveryOption = deliveryOptions.find((option)=> option.id === deliveryOptionId);
const today = dayjs();
const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
const deliveryDateString = deliveryDate.format('dddd, MMM, D');

  summaryHtml += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date js-delivery-date">
        Delivery date: ${deliveryDateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents/100)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id=${matchingProduct.id}
            >
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHtml(matchingProduct,cartItem)}
        </div>
      </div>
    </div>
 `;

});

function deliveryOptionsHtml(matchingProduct, cartItem){
  let html = ''
    deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const deliveryDateString = deliveryDate.format('dddd, MMM, D')

    const deliveryFee = deliveryOption.priceCents === 0 
    ?  "FREE"
    : `$${formatCurrency(deliveryOption.priceCents/100)}`

    const checked =  deliveryOption.id === cartItem.deliveryOptionId
    ? 'checked'
    : ''
    ; 

   html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
                ${checked}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDateString}
          </div>
          <div class="delivery-option-price">
            ${deliveryFee} - Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;
};


document.querySelector('.js-order-summary').innerHTML = summaryHtml;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=> {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

  })
});

document.querySelectorAll('.js-delivery-option').forEach((buttonElement)=>{
  const { productId, deliveryOptionId } = buttonElement.dataset;
  buttonElement.addEventListener('click', ()=> {
    updateDeliveryOption(productId, deliveryOptionId);
  })
});