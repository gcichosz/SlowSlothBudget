import * as React from "react";
import { Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, Row } from "react-bootstrap";

class ExpensesFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleCategoryChange(event) {
        this.props.onCategoryChange(event.target.value);
    }

    handleDescriptionChange(event) {
        this.props.onDescriptionChange(event.target.value);
    }

    render() {
        return (
            <div>
                <h2>Expenses filter</h2>
                <form id='filter-expense-form' onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <FormGroup controlId="category-filter">
                                <ControlLabel>Category</ControlLabel>
                                <FormControl type="text" value={this.props.category} placeholder="e.g. Groceries"
                                             onChange={this.handleCategoryChange} />
                            </FormGroup>
                        </Col>
                        <Col sm={4}>
                            <FormGroup controlId="description-filter">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl type="text" value={this.props.description}
                                             placeholder="e.g. Weekly groceries"
                                             onChange={this.handleDescriptionChange} />
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