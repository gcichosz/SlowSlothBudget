import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from '../Navigation/NavMenu';
import './Layout.css'

export default props => (
    <Grid fluid>
        <Row>
            <Col sm={3}>
                <NavMenu />
            </Col>
            <Col sm={9} className="app-content">
                {props.children}
            </Col>
        </Row>
    </Grid>
);
