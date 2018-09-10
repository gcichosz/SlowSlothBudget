import React from 'react';
import moment from "moment";
import auth0Client from '../utils/Auth';
import AmountInput from './AmountInput';
import DateInput from "./DateInput";
import CategoryInput from "./CategoryInput";
import DescriptionInput from "./DescriptionInput";
import './AddExpense.css'

class AddExpense extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expense: {
                amount: '',
                date: moment(),
                category: '',
                description: '',
            },
            submitted: false
        };

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAmountChange(value) {
        const currencyAmountRegex = /^\d+(([.,])\d{0,2})?$/;
        if (!value || currencyAmountRegex.test(value)) {
            let expense = {...this.state.expense};
            expense.amount = value.replace(/,/g, '.');
            this.setState({expense: expense});
        }
    }

    handleDateChange(date) {
        let expense = {...this.state.expense};
        expense.date = date;
        this.setState({expense: expense});
    }

    handleCategoryChange(value) {
        let expense = {...this.state.expense};
        expense.category = value;
        this.setState({expense: expense});
    }

    handleDescriptionChanged(value) {
        let expense = {...this.state.expense};
        expense.description = value;
        this.setState({expense: expense});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});

        const expense = this.state.expense;
        if (!expense.amount || !expense.date || !expense.category) {
            return;
        }

        fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            },
            body: JSON.stringify(expense)
        });
    }

    render() {
        const expense = this.state.expense;
        const amountInvalid = !expense.amount;
        const dateInvalid = !expense.date;
        const categoryInvalid = !expense.category;
        const displayErrors = this.state.submitted && (!expense.amount || !expense.date || !expense.category);
        return (
            <div>
                <form id='add-expense-form' onSubmit={this.handleSubmit}
                      className={displayErrors ? 'displayErrors' : ''}>
                    <h1>Welcome to Slow Sloth Budget</h1>
                    {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
                    <AmountInput amount={expense.amount} onAmountChange={this.handleAmountChange}
                                 displayError={amountInvalid} />
                    <DateInput date={expense.date} onDateChanged={this.handleDateChange}
                               displayError={dateInvalid} />
                    <CategoryInput category={expense.category} onCategoryChanged={this.handleCategoryChange}
                                   displayError={categoryInvalid} />
                    <DescriptionInput description={expense.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <button type="submit" id='add-expense-button'>Add expense</button>
                </form>
            </div>
        )
    }
}

export default AddExpense;