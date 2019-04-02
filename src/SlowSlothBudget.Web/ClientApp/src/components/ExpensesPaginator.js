import * as React from "react";
import { Button } from "react-bootstrap";

class ExpensesPaginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 3,
            offset: 0,
        };

        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
    }

    createPageNumbers() {
        let pages = [];

        for (let i = 0; i < 4; i++) {
            pages.push(<span>{i + 1}</span>)
        }

        return pages;
    }

    handleOffsetChanged(offset) {
        this.setState({offset: offset});
    }

    handlePreviousButtonClick() {
        let updatedOffset = this.state.offset - this.state.limit;
        if (updatedOffset < 0) {
            return;
        }

        this.handleOffsetChanged(updatedOffset);
        this.props.onOffsetChanged(updatedOffset);
    }

    handleNextButtonClick() {
        let updatedOffset = this.state.offset + this.state.limit;
        if (updatedOffset > 11) {
            return;
        }
        
        this.handleOffsetChanged(updatedOffset);
        this.props.onOffsetChanged(updatedOffset);
    }

    render() {
        return (
            <div>
                <Button type="button" bsStyle="primary" onClick={this.handlePreviousButtonClick}>Previous</Button>
                {this.createPageNumbers()}
                <Button type="button" bsStyle="primary" onClick={this.handleNextButtonClick}>Next</Button>
            </div>
        )
    }
}

export default ExpensesPaginator;