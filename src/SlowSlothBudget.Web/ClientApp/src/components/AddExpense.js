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
            amountValid: false,
            dateValid: true,
            categoryValid: false,
            displayErrors: false
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
            this.setState({amount: value, amountValid: !!value});
        }
    }

    handleDateChange(date) {
        this.setState({
            date: date,
            dateValid: !!date
        });
    }

    handleCategoryChange(value) {
        this.setState({
            category: value,
            categoryValid: !!value
        });
    }

    handleDescriptionChanged(value) {
        this.setState({
            description: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.amountValid || !this.state.dateValid || !this.state.categoryValid) {
            this.setState({displayErrors: true});
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
        this.setState({displayErrors: false});
    }

    render() {
        return (
            <div>
                <form id='add-expense-form' onSubmit={this.handleSubmit}
                      className={this.state.displayErrors ? 'displayErrors' : ''}>
                    <h1>Welcome to Slow Sloth Budget</h1>
                    {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
                    <AmountInput amount={this.state.amount} onAmountChange={this.handleAmountChange}
                                 displayError={!this.state.amountValid} />
                    <DateInput date={this.state.date} onDateChanged={this.handleDateChange}
                               displayError={!this.state.dateValid} />
                    <CategoryInput category={this.state.category} onCategoryChanged={this.handleCategoryChange}
                                   displayError={!this.state.categoryValid} />
                    <DescriptionInput description={this.state.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <button type="submit" id='add-expense-button'>Add expense</button>
                </form>
            </div>
        )
    }
}

export default AddExpense;