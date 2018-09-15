import React from 'react';
import { shallow } from 'enzyme';
import LoginLink from './LoginLink';

import Auth from '../utils/Auth';
jest.mock('../utils/Auth');

it('renders log in to anonymous users', () => {
    Auth.isAuthenticated.mockImplementation(() => false);
    const wrapper = shallow(<LoginLink.WrappedComponent />);
    const login = "Log in";
    
    expect(wrapper.contains(login)).toEqual(true);
});

it('renders log out to authenticated user', () => {
    Auth.isAuthenticated.mockImplementation(() => true);
    const wrapper = shallow(<LoginLink.WrappedComponent />);
    const logout = "Log out";

    expect(wrapper.contains(logout)).toEqual(true);
});
