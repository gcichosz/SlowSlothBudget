import * as React from "react";
import { Pagination } from "react-bootstrap";

class ExpensesPaginator extends React.Component {
    constructor(props) {
        super(props);

        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handlePreviousButtonClick = this.handlePreviousButtonClick.bind(this);
    }

    createPaginationItems() {
        let paginationItems = [];
        let currentPage = Math.floor(this.props.pagination.offset / this.props.pagination.limit) + 1;
        let totalPageNumber = Math.ceil(this.props.totalExpensesNumber / this.props.pagination.limit);

        for (let pageNumber = 1; pageNumber <= totalPageNumber; pageNumber++) {
            paginationItems.push(<Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => {
                this.handlePageChanged(pageNumber)
            }}>{pageNumber}</Pagination.Item>);
        }

        return paginationItems;
    }

    handlePageChanged(page) {
        this.handleOffsetChanged(this.props.pagination.limit * (page - 1));
    }

    handleOffsetChanged(offset) {
        this.props.onOffsetChanged(offset);
    }

    handlePreviousButtonClick() {
        if (this.canPrevious()) {
            this.handleOffsetChanged(this.props.pagination.offset - this.props.pagination.limit);

        }
    }

    handleNextButtonClick() {
        if (this.canNext()) {
            this.handleOffsetChanged(this.props.pagination.offset + this.props.pagination.limit);
        }
    }

    canPrevious() {
        return this.props.pagination.offset - this.props.pagination.limit >= 0;
    }

    canNext() {
        return this.props.pagination.offset + this.props.pagination.limit < this.props.totalExpensesNumber;
    }

    render() {
        return (
            <div>
                <Pagination>
                    <Pagination.Prev onClick={this.handlePreviousButtonClick} disabled={!this.canPrevious()} />
                    {this.createPaginationItems()}
                    <Pagination.Next onClick={this.handleNextButtonClick} disabled={!this.canNext()} />
                </Pagination>
            </div>
        )
    }
}

export default ExpensesPaginator;