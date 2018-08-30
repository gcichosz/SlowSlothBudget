import React from 'react';
import { shallow } from 'enzyme';
import AmountInput from "./AmountInput";

it('should not accept non amount values', () => {
    let notAmountInput = 'not-amount';
    const event = {
        preventDefault() {},
        target: { value: notAmountInput }
    };
    const wrapper = shallow(<AmountInput />);
    
    wrapper.find('input').simulate('change', event);
    
    expect(wrapper.find('input').props().value).toEqual('');
});

it('should accept amount values', () => {
    let amountInput = '123,45';
    const event = {
        preventDefault() {},
        target: { value: amountInput }
    };
    const wrapper = shallow(<AmountInput />);
    
    wrapper.find('input').simulate('change', event);
    
    expect(wrapper.find('input').props().value).toEqual(amountInput);
});