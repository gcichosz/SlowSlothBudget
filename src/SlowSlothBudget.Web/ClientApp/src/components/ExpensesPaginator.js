import * as React from "react";
import { Button } from "react-bootstrap";

class ExpensesPaginator extends React.Component {
    constructor(props) {
        super(props);

        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
    }

    createPageNumbers() {
        let pages = [];
        let currentPage = Math.floor(this.props.pagination.offset / this.props.pagination.limit);
        let totalPageNumber = Math.ceil(this.props.totalExpensesNumber / this.props.pagination.limit);

        for (let i = 0; i < totalPageNumber; i++) {
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
        this.handleOffsetChanged(this.props.pagination.limit * page)
    }

    handleOffsetChanged(offset) {
        this.props.onOffsetChanged(offset);
    }

    handlePreviousButtonClick() {
        let updatedOffset = this.props.pagination.offset - this.props.pagination.limit;
        if (updatedOffset < 0) {
            return;
        }

        this.handleOffsetChanged(updatedOffset);
    }

    handleNextButtonClick() {
        let updatedOffset = this.props.pagination.offset + this.props.pagination.limit;
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