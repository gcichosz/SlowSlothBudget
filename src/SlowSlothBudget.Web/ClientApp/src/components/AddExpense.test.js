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

it('does not accept non amount values in amount input', () => {
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

it('accepts amount values in amount input', () => {
    let amountInput = '123.45';
    const event = {
        preventDefault() {
        },
        target: {value: amountInput}
    };
    const wrapper = mount(<AddExpense />);

    wrapper.find('#amount-input').simulate('change', event);

    expect(wrapper.find('#amount-input').props().value).toEqual(amountInput);
});

it('validates required inputs correctly', () => {
    const wrapper = mount(<AddExpense />);
    const changeEvent = {
        preventDefault() {
        },
        target: {value: ''}
    };
    const submitEvent = {
        preventDefault: jest.fn()
    };

    wrapper.find('input#date-input').simulate('change', changeEvent);
    wrapper.find('form').simulate('submit', submitEvent);

    expect(wrapper.find('form').hasClass('displayErrors')).toEqual(true);
    expect(wrapper.find('AmountInput').props().displayError).toEqual(true);
    expect(wrapper.find('DateInput').props().displayError).toEqual(true);
    expect(wrapper.find('CategoryInput').props().displayError).toEqual(true);
});