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

        this.handleExpenseChange = this.handleExpenseChange.bind(this);
        this.handleExpenseDeleteButtonClick = this.handleExpenseDeleteButtonClick.bind(this);
        this.handleExpenseSaveButtonClick = this.handleExpenseSaveButtonClick.bind(this);
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

    handleExpenseChange(expense) {
        this.setState({expenses: this.state.expenses.map(e => e.id === expense.id ? expense : e)});
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
        });
    };

    handleExpenseSaveButtonClick(expense, pristineExpense) {
        fetch(`/api/expenses/${expense.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            },
            body: JSON.stringify(expense)
        }).then(response => {
            if (!response.ok) {
                this.setState({expenses: this.state.expenses.map(e => e.id === expense.id ? pristineExpense : e)});
            }
        });

    };

    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.expenses.map((expense) => <ExpenseRow expense={expense} key={expense.id}
                                                                  onDeleteButtonClick={this.handleExpenseDeleteButtonClick}
                                                                  onSaveButtonClick={this.handleExpenseSaveButtonClick}
                                                                  onExpenseChange={this.handleExpenseChange} />)}
                </tbody>
            </Table>
        )
    }
}

export default ExpensesList;