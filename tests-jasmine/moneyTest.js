import formatCurrency from "../scripts/utils/money.js";

describe('test suite: formatCurrency', ()=>{
  it('converts cents to dollars', ()=> {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with zero', ()=> {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds down to nearest cent', ()=>{
    expect(formatCurrency(2094.1)).toEqual('20.94');
  });

});