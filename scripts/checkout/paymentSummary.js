import { cart, estimatedTaxRender, grandTotal, paymentSummaryMoney, shippingFee, totalBeforeTax } from "../../data/cart.js";

export function renderPaymentSummary(){
  let cartQuantity = 0;

  cart.forEach((cartItem)=> {
    cartQuantity += cartItem.quantity
  })




  let paymentSummaryHtml = `
<div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${paymentSummaryMoney()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${shippingFee()}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalBeforeTax()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${estimatedTaxRender()}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${grandTotal()}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
    `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
  paymentSummaryMoney();
  totalBeforeTax();
};



