import * as React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";

class ExpensesExplorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                category: '',
                description: ''
            }
        };

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    }

    handleFilterSubmit(filter) {
        this.setState({filter: filter});
    }

    render() {
        return (
            <div>
                <ExpensesFilter onFilterSubmitted={this.handleFilterSubmit} />
                <ExpensesList filter={this.state.filter} />
            </div>
        )
    }
}

export default ExpensesExplorer;