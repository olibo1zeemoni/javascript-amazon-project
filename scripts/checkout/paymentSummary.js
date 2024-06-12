import * as Cart from "../../data/cart.js";

export function renderPaymentSummary(){
  let cartQuantity = 0;

  Cart.cart.forEach((cartItem)=> {
    cartQuantity += cartItem.quantity
  })




  let paymentSummaryHtml = `
<div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${Cart.paymentSummaryMoney()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${Cart.shippingFee()}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${Cart.totalBeforeTax()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${Cart.estimatedTaxRender()}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${Cart.grandTotal()}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
    `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
  Cart.paymentSummaryMoney();
  Cart.totalBeforeTax();
};



