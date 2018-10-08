import React from 'react';
import { mount } from 'enzyme';
import AddExpense from './AddExpense';

jest.mock('../utils/Auth');

it('validates required inputs correctly', () => {
    const wrapper = mount(<AddExpense />);

    wrapper.instance().handleDateChange(null);
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    wrapper.update();

    expect(wrapper.find('AmountInputFormGroup').props().invalid).toEqual(true);
    expect(wrapper.find('DateInput').props().invalid).toEqual(true);
    expect(wrapper.find('CategoryInput').props().invalid).toEqual(true);
});