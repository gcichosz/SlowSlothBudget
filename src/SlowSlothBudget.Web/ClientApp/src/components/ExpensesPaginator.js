import * as React from "react";
import { Button } from "react-bootstrap";

class ExpensesPaginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...this.props.pagination};

        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
    }

    createPageNumbers() {
        let pages = [];
        let currentPage = Math.floor(this.state.offset / this.state.limit);

        for (let i = 0; i < 4; i++) {
            if (i === currentPage) {
                pages.push(<a onClick={() => {
                    this.handlePageChanged(i)
                }}><b>{i + 1}</b></a>)

            } else {
                pages.push(<a onClick={() => {
                    this.handlePageChanged(i)
                }}>{i + 1}</a>)
            }
        }

        return pages;
    }

    handlePageChanged(page) {
        this.handleOffsetChanged(this.state.limit * page)
    }

    handleOffsetChanged(offset) {
        this.setState({offset: offset});
        this.props.onOffsetChanged(offset);
    }

    handlePreviousButtonClick() {
        let updatedOffset = this.state.offset - this.state.limit;
        if (updatedOffset < 0) {
            return;
        }

        this.handleOffsetChanged(updatedOffset);
    }

    handleNextButtonClick() {
        let updatedOffset = this.state.offset + this.state.limit;
        if (updatedOffset > this.props.totalExpensesNumber) {
            return;
        }

        this.handleOffsetChanged(updatedOffset);
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