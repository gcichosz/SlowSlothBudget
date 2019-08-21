import React from 'react';
import { shallow } from 'enzyme';
import LoginLink from './LoginLink';

import Auth from '../Auth/Auth';
jest.mock('../Auth/Auth');

it('renders log in to anonymous users', () => {
    Auth.isAuthenticated.mockImplementation(() => false);
    const wrapper = shallow(<LoginLink.WrappedComponent />);
    const login = "Log in";
    
    expect(wrapper.contains(login)).toEqual(true);
});

it('renders log out to authenticated user', () => {
    let nickname = "Test user";
    Auth.isAuthenticated.mockImplementation(() => true);
    Auth.getProfile.mockImplementation(() => {
        return {nickname: nickname};
    });
    const wrapper = shallow(<LoginLink.WrappedComponent />);
    const logout = `Log out (${nickname})`;

    expect(wrapper.contains(logout)).toEqual(true);
});
