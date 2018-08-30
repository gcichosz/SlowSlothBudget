import React from 'react';
import { shallow } from 'enzyme';
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
