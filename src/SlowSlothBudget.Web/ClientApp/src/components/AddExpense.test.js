import React from 'react';
import { shallow, mount } from 'enzyme';
import AddExpense from './AddExpense';

import Auth from '../utils/Auth';

jest.mock('../utils/Auth');

it('does not render authenticated users message to anonymous user', () => {
    Auth.isAuthenticated.mockImplementationOnce(() => false);
    const wrapper = shallow(<AddExpense />);
    const welcome = <h2>Anonymous users shouldn't see this</h2>;

    expect(wrapper.contains(welcome)).toEqual(false);
});

it('renders authenticated users message to authenticated user', () => {
    Auth.isAuthenticated.mockImplementationOnce(() => true);
    const wrapper = shallow(<AddExpense />);
    const welcome = <h2>Anonymous users shouldn't see this</h2>;

    expect(wrapper.contains(welcome)).toEqual(true);
});

it('should not accept non amount values in amount input', () => {
    let notAmountInput = 'not-amount';
    const event = {
        preventDefault() {
        },
        target: {value: notAmountInput}
    };
    const wrapper = mount(<AddExpense />);

    wrapper.find('#amount-input').simulate('change', event);

    expect(wrapper.find('#amount-input').props().value).toEqual('');
});

it('should accept amount values in amount input', () => {
    let amountInput = '123,45';
    const event = {
        preventDefault() {
        },
        target: {value: amountInput}
    };
    const wrapper = mount(<AddExpense />);

    wrapper.find('#amount-input').simulate('change', event);

    expect(wrapper.find('#amount-input').props().value).toEqual(amountInput);
});
