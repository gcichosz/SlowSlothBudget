import * as React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesPaginator from "./ExpensesPaginator";

class ExpensesExplorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                category: '',
                description: ''
            },
            pagination: {
                limit: 20,
                offset: 0,
            },
            totalExpensesNumber: 0
        };

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.handleOffsetChanged = this.handleOffsetChanged.bind(this);
        this.handleTotalExpensesNumberChanged = this.handleTotalExpensesNumberChanged.bind(this);
    }

    handleFilterSubmit(filter) {
        let pagination = {...this.state.pagination};
        pagination.offset = 0;
        this.setState({filter: filter, pagination: pagination});
    }

    handleTotalExpensesNumberChanged(totalExpensesNumber) {
        this.setState({totalExpensesNumber: totalExpensesNumber});
    }

    handleOffsetChanged(offset) {
        let pagination = {...this.state.pagination};
        pagination.offset = offset;
        this.setState({pagination: pagination});
    }

    render() {
        return (
            <div>
                <ExpensesFilter onFilterSubmitted={this.handleFilterSubmit} />
                <ExpensesList filter={this.state.filter} pagination={this.state.pagination}
                              onTotalExpensesNumberChanged={this.handleTotalExpensesNumberChanged} />
                <ExpensesPaginator pagination={this.state.pagination}
                                   totalExpensesNumber={this.state.totalExpensesNumber}
                                   onOffsetChanged={this.handleOffsetChanged} />
            </div>
        )
    }
}

export default ExpensesExplorer;