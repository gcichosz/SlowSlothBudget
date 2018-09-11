import React from 'react';
import { mount } from 'enzyme';
import DateInput from "./DateInput";

it('replaces \',\' characters with \'.\'', () => {
    const commas = ',,,';
    const dots = '...';
    const event = {
        preventDefault() {
        },
        target: {value: commas}
    };
    const wrapper = mount(<DateInput />);

    wrapper.find('input').simulate('change', event);

    expect(wrapper.find('input').props().value).toEqual(dots);
});
