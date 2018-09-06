import React from 'react';
import moment from "moment";
import auth0Client from '../utils/Auth';
import AmountInput from './AmountInput';
import DateInput from "./DateInput";
import CategoryInput from "./CategoryInput";
import DescriptionInput from "./DescriptionInput";

class AddExpense extends React.Component {
    constructor(props) {
        super(props);

        this.state = {amount: '', date: moment(), category: '', description: ''};

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

    validateForm() {
        const {amount, date, category} = this.state;
        return !!amount && !!date && !!category;
    }

    handleSubmit(event) {
        event.preventDefault();

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
        const disabled = !this.validateForm();
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Welcome to Slow Sloth Budget</h1>
                    {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
                    <AmountInput amount={this.state.amount} onAmountChange={this.handleAmountChange} />
                    <DateInput date={this.state.date} onDateChanged={this.handleDateChange} />
                    <CategoryInput category={this.state.category} onCategoryChanged={this.handleCategoryChange} />
                    <DescriptionInput description={this.state.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <button type="submit" id='add-expense-button' disabled={disabled}>Add expense</button>
                </form>
            </div>

        )
    }
}

export default AddExpense;