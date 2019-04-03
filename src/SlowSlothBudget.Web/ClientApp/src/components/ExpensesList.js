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

    static createQueryParameters(queryObject) {
        let queryParameters = [];
        for (let key in queryObject) {
            if (queryObject.hasOwnProperty(key) && queryObject[key]) {
                queryParameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key]));
            }
        }
        return queryParameters;
    }

    componentDidMount() {
        this.fetchExpenses();
    }

    componentDidUpdate(prevProps) {
        if (this.didFilterChanged(prevProps) || this.didPaginationChanged(prevProps)) {
            this.fetchExpenses();
        }
    }

    didFilterChanged(prevProps) {
        return this.props.filter.category !== prevProps.filter.category || this.props.filter.description !== prevProps.filter.description;
    }

    didPaginationChanged(prevProps) {
        return this.props.pagination.offset !== prevProps.pagination.offset || this.props.pagination.limit !== prevProps.pagination.limit;
    }

    fetchExpenses() {
        let queryString = this.buildQueryString();
        fetch('/api/expenses' + (queryString ? `?${queryString}` : ''), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            }
        }).then(response => {
            this.props.onTotalExpensesNumberChanged(response.headers.get("X-Total-Count"));
            return response.json()
        }).then(result => this.setState({expenses: result}));
    }

    buildQueryString() {
        let filterQuery = ExpensesList.createQueryParameters(this.props.filter);
        let paginationQuery = ExpensesList.createQueryParameters(this.props.pagination);
        let query = filterQuery.concat(paginationQuery);

        return query.join('&');
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
            <div>
                <h2>Expenses list</h2>
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
            </div>
        )
    }
}

export default ExpensesList;