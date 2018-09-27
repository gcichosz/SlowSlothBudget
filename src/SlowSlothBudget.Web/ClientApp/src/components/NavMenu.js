import React from 'react';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginLink from './LoginLink'
import './NavMenu.css';

export default () => (
    <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                Slow Sloth Budget
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>
                        <Glyphicon glyph='home' /> Home
                    </NavItem>
                </LinkContainer>
                <LinkContainer exact to="/expensesexplorer">
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Expenses
                    </NavItem>
                </LinkContainer>
                <LoginLink />
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);