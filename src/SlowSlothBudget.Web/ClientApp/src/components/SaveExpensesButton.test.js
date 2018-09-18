import React from 'react';
import { shallow } from 'enzyme';
import SaveExpenseButton from './SaveExpenseButton'

it('is enabled when not loading', () => {
    const wrapper = shallow(<SaveExpenseButton loading={false} />);

    expect(wrapper.find('#add-expense-button[disabled]').props().disabled).toEqual(false);
});

it('is contains save prompt when not loading', () => {
    const wrapper = shallow(<SaveExpenseButton loading={false} />);

    expect(wrapper.find('button').contains('Save expense')).toEqual(true);
    expect(wrapper.find('#add-expense-loader')).toHaveLength(0);
});

it('is disabled when loading', () => {
    const wrapper = shallow(<SaveExpenseButton loading={true} />);
    
    expect(wrapper.find('#add-expense-button[disabled]').props().disabled).toEqual(true);
});

it('is contains loader when loading', () => {
    const wrapper = shallow(<SaveExpenseButton loading={true} />);

    expect(wrapper.find('button').contains('Save expense')).toEqual(false);
    expect(wrapper.find('#add-expense-loader')).toHaveLength(1);
});
