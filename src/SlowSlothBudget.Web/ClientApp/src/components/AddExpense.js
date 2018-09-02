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

        this.state = {amount: '', date: moment(), category: ''};

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
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
        })
    }

    render() {
        return (
            <div>
                <form>
                    <h1>Welcome to Slow Sloth Budget</h1>
                    {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
                    <AmountInput amount={this.state.amount} onAmountChange={this.handleAmountChange} />
                    <DateInput date={this.state.date} onDateChanged={this.handleDateChange} />
                    <CategoryInput category={this.state.category} onCategoryChanged={this.handleCategoryChange} />
                    <DescriptionInput />
                    <button type="submit">Add expense</button>
                </form>
            </div>

        )
    }
}

export default AddExpense;