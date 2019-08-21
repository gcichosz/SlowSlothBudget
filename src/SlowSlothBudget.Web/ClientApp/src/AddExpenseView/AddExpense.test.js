import React from 'react';
import { mount } from 'enzyme';
import AddExpense from './AddExpense';

jest.mock('../Auth/Auth');

it('validates required inputs correctly', () => {
    const wrapper = mount(<AddExpense />);

    wrapper.instance().handleInputChange("date", null);
    wrapper.instance().handleSubmit({preventDefault: jest.fn()});
    wrapper.update();

    expect(wrapper.find('AmountInputFormGroup').props().invalid).toEqual(true);
    expect(wrapper.find('DateInputFormGroup').props().invalid).toEqual(true);
    expect(wrapper.find('CategoryInputFormGroup').props().invalid).toEqual(true);
});