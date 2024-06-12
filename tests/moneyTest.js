import formatCurrency from "../scripts/utils/money.js";
console.log('test suite: formatCurrency');

console.log('rounds down nearest cent');
if (formatCurrency(2500.1) === '25.00'){
  console.log('passed')
} else {
  console.log('failed')//edge test case
};

console.log('converts cents to dollars');
if (formatCurrency(2095) === '20.95'){
  console.log('passed')
} else {
  console.log('failed')
};//basic test case

console.log('works with zero');
if (formatCurrency(0) === '0.00'){
  console.log('passed')
} else {
  console.log('failed')
};//edge test case

