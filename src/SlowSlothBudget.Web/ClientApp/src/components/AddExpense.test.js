import React from 'react';
import { mount, shallow } from 'enzyme';
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
    const notAmountInput = 'not-amount';
    const wrapper = shallow(<AddExpense />);

    wrapper.instance().handleAmountChange(notAmountInput);

    expect(wrapper.state('expense').amount).toEqual('');
});

it('replaces \',\' characters with \'.\' in amount input', () => {
    const commaSeparatedNumber = '1,23';
    const dotSeparatedNumber = '1.23';
    const wrapper = shallow(<AddExpense />);

    wrapper.instance().handleAmountChange(commaSeparatedNumber);

    expect(wrapper.state('expense').amount).toEqual(dotSeparatedNumber);
});

it('accepts amount values in amount input', () => {
    const amountInput = '123.45';
    const wrapper = shallow(<AddExpense />);

    wrapper.instance().handleAmountChange(amountInput);

    expect(wrapper.state('expense').amount).toEqual(amountInput);
});

it('validates required inputs correctly', () => {
    const wrapper = mount(<AddExpense />);

    wrapper.instance().handleDateChange(null);
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    wrapper.update();

    expect(wrapper.find('form').hasClass('displayErrors')).toEqual(true);
    expect(wrapper.find('AmountInput').props().displayError).toEqual(true);
    expect(wrapper.find('DateInput').props().displayError).toEqual(true);
    expect(wrapper.find('CategoryInput').props().displayError).toEqual(true);
});