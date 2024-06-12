import { products } from "./products.js";
import formatCurrency from "../scripts/utils/money.js";
import { deliveryOptions } from "./deliveryOptions.js";
export const cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }
];

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
  
};

export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
  }});

  if (matchingItem) {
    matchingItem.quantity += 1;
  }else {
    cart.push({
    productId: productId,
    quantity: 1,
    deliveryOptionId: '1'
  })
  };
  saveToStorage();
};

export function removeFromCart(productId){
  let cartItem = cart.find((cartItem)=> cartItem.productId === productId);
  const index = cart.indexOf(cartItem);
  cart.splice(index,1)
  saveToStorage();
};


export function updateDeliveryOption(productId, deliveryOptionId){
/*  let matchingItem;
// cart.forEach((cartItem)=> {
//   if (productId === cartItem.productId){
//     matchingItem = cartItem
//   }
// });
   matchingItem.deliveryOptionId = deliveryOptionId; */

  let matchingItem = cart.find((cartItem)=> cartItem.productId === productId);
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

function paymentSummaryInit(){
  let grandTotal = 0;
  let itemTotal = 0;
  let unitPrice;
  cart.forEach((cartItem)=> {
    const quantity = cartItem.quantity
    unitPrice = products.find((product)=> product.id === cartItem.productId).priceCents;
    itemTotal = unitPrice * quantity
    grandTotal += itemTotal;
  })
  return grandTotal;
}

export function paymentSummaryMoney(){
  let grandTotal = paymentSummaryInit();
  return formatCurrency(grandTotal);
};

function shipping(){
  let shippingTotalFee = 0;
  let itemShippingFee;
  cart.forEach((cartItem)=>{
    const deliveryOptionId = cartItem.deliveryOptionId
    itemShippingFee = deliveryOptions.find((deliveryOption)=> deliveryOptionId === deliveryOption.id).priceCents;
    shippingTotalFee += itemShippingFee;
  })
  return shippingTotalFee
}

export function shippingFee(){
  let shippingTotalFee = shipping();
  return formatCurrency(shippingTotalFee);
};

export function totalBeforeTax(){
  let total = paymentSummaryInit() + shipping();
  return formatCurrency(total);
}

function estimatedTax(){
  let totalBeforeTax = paymentSummaryInit() + shipping();
  let taxRate = 0.1;
  let estimatedTax = totalBeforeTax * taxRate;
  return estimatedTax
}
export function estimatedTaxRender(){
  return formatCurrency(estimatedTax());
}

export function grandTotal(){
  let totalBeforeTax = paymentSummaryInit() + shipping();
  let tax = estimatedTax();
  let total = totalBeforeTax + tax;
  return formatCurrency(total);
}