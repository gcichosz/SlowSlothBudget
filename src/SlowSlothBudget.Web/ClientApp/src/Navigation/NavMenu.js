import React from 'react';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginLink from './LoginLink'
import './NavMenu.css';
import auth0Client from "../Auth/Auth";

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
                {auth0Client.isAuthenticated() &&
                <React.Fragment>
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
                    <LinkContainer exact to="/yearaverages">
                        <NavItem>
                            <Glyphicon glyph='stats' /> Statistics
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer exact to="/categorieshierarchy">
                        <NavItem>
                            <Glyphicon glyph='cog' /> Categories
                        </NavItem>
                    </LinkContainer>
                </React.Fragment>
                }
                <LoginLink />
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);