import * as React from "react";
import { Table } from "react-bootstrap"
import ExpenseRow from "./ExpenseRow";
import auth0Client from "../utils/Auth";

class ExpensesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: []
        };

        this.handleExpenseDeleteButtonClick = this.handleExpenseDeleteButtonClick.bind(this);
    }

    componentDidMount() {
        fetch('/api/expenses', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            }
        }).then(response => response.json()).then(result => this.setState({expenses: result}));
    }

    handleExpenseDeleteButtonClick(expenseId) {
        fetch(`/api/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            }
        }).then(response => {
            if (response.ok) {
                this.setState({expenses: this.state.expenses.filter(e => e.id !== expenseId)});
            }
        })
    };

    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.expenses.map((expense) => <ExpenseRow expense={expense} key={expense.id}
                                                                  onDeleteButtonClick={this.handleExpenseDeleteButtonClick} />)}
                </tbody>
            </Table>
        )
    }
}

export default ExpensesList;