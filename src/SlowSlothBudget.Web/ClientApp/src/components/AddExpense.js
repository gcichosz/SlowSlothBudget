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
            amount: '',
            date: moment(),
            category: '',
            description: '',
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
            this.setState({amount: value});
        }
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    handleCategoryChange(value) {
        this.setState({
            category: value
        });
    }

    handleDescriptionChanged(value) {
        this.setState({
            description: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});

        if (!this.state.amount || !this.state.date || !this.state.category) {
            return;
        }

        fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            },
            body: JSON.stringify(this.state)
        });
    }

    render() {
        const amountInvalid = !this.state.amount;
        const dateInvalid = !this.state.date;
        const categoryInvalid = !this.state.category;
        const displayErrors = this.state.submitted && (!this.state.amount || !this.state.date || !this.state.category);
        return (
            <div>
                <form id='add-expense-form' onSubmit={this.handleSubmit}
                      className={displayErrors ? 'displayErrors' : ''}>
                    <h1>Welcome to Slow Sloth Budget</h1>
                    {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
                    <AmountInput amount={this.state.amount} onAmountChange={this.handleAmountChange}
                                 displayError={amountInvalid} />
                    <DateInput date={this.state.date} onDateChanged={this.handleDateChange}
                               displayError={dateInvalid} />
                    <CategoryInput category={this.state.category} onCategoryChanged={this.handleCategoryChange}
                                   displayError={categoryInvalid} />
                    <DescriptionInput description={this.state.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <button type="submit" id='add-expense-button'>Add expense</button>
                </form>
            </div>
        )
    }
}

export default AddExpense;