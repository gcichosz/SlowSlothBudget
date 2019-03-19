import * as React from "react";
import { Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Row } from "react-bootstrap";

class ExpensesFilter extends React.Component {
    render() {
        return (
            <div>
                <h2>Expenses filter</h2>
                <form id='filter-expense-form' onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <FormGroup controlId="category-filter">
                                <ControlLabel>Category</ControlLabel>
                                <FormControl type="text" placeholder="e.g. Groceries" />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup controlId="description-filter">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl type="text" placeholder="e.g. Weekly groceries" />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <Button type="submit" id='filter-expenses-button' bsStyle="primary">Filter expenses</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

export default ExpensesFilter;