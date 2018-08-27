import React from 'react';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
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
                <NavItem>
                    <Glyphicon glyph='home' /> Home
                </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

);