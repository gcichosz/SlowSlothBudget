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
                limit: 3,
                offset: 0,
            }
        };

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.handleOffsetChanged = this.handleOffsetChanged.bind(this);
    }

    handleFilterSubmit(filter) {
        this.setState({filter: filter});
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
                <ExpensesList filter={this.state.filter} pagination={this.state.pagination} />
                <ExpensesPaginator onOffsetChanged={this.handleOffsetChanged} />
            </div>
        )
    }
}

export default ExpensesExplorer;