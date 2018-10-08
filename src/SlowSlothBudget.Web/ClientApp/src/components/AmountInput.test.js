import React from 'react';
import { shallow } from 'enzyme';

import AmountInput from "./AmountInput";

function createEventWithValue(value) {
    return {target: {value: value}};
}

jest.mock('../utils/Auth');

it('does not accept non amount values in amount input', () => {
    const notAmountInput = 'not-amount';
    const mockCallback = jest.fn(x => x);
    const wrapper = shallow(<AmountInput onAmountChange={mockCallback} />);

    wrapper.instance().handleChange(createEventWithValue(notAmountInput));

    expect(mockCallback.mock.calls.length).toBe(0);
});

it('replaces \',\' characters with \'.\' in amount input', () => {
    const commaSeparatedNumber = '1,23';
    const dotSeparatedNumber = '1.23';
    const mockCallback = jest.fn(x => x);
    const wrapper = shallow(<AmountInput onAmountChange={mockCallback} />);

    wrapper.instance().handleChange(createEventWithValue(commaSeparatedNumber));

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(dotSeparatedNumber);
});

it('accepts amount values in amount input', () => {
    const amountInput = '123.45';
    const mockCallback = jest.fn(x => x);
    const wrapper = shallow(<AmountInput onAmountChange={mockCallback} />);

    wrapper.instance().handleChange(createEventWithValue(amountInput));

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(amountInput);
});

