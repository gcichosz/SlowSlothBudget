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
            submitted: false,
            loading: false,
            saved: false,
            errors: {
                unauthorized: false,
                serverError: false,
                badRequestError: false
            }
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

        const cleanErrors = {};
        this.setState({submitted: true, saved: false, errors: cleanErrors});

        const expense = this.state.expense;
        if (!expense.amount || !expense.date || !expense.category) {
            return;
        }

        this.setState({loading: true});
        fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            },
            body: JSON.stringify(expense)
        }).then(response => {
            if (response.ok) {
                const cleanExpense = {
                    amount: '',
                    date: moment(),
                    category: '',
                    description: ''
                };
                this.setState({expense: cleanExpense, submitted: false, saved: true})
            } else {
                throw new Error(response.status)
            }
        }).catch(error => {
            switch (error.message) {
                case '400':
                    const badRequestError = {badRequest: true};
                    this.setState({errors: badRequestError});
                    break;
                case '401':
                    const unauthorizedError = {unauthorized: true};
                    this.setState({errors: unauthorizedError});
                    break;
                default:
                    const serverError = {serverError: true};
                    this.setState({errors: serverError});
                    break;
            }
        }).finally(() => this.setState({loading: false}));
    }

    render() {
        const expense = this.state.expense;
        const amountInvalid = !expense.amount;
        const dateInvalid = !expense.date;
        const categoryInvalid = !expense.category;
        const displayFormErrors = this.state.submitted && (!expense.amount || !expense.date || !expense.category);
        return (
            <div>
                <form id='add-expense-form' onSubmit={this.handleSubmit}
                      className={displayFormErrors ? 'displayErrors' : ''}>
                    <h1>Welcome to Slow Sloth Budget</h1>
                    {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
                    {this.state.saved ? <span>Expense saved</span> : ''}
                    {this.state.errors.badRequest ?
                        <span>The expense you are trying to save contains errors. Please correct them.</span> : ''}
                    {this.state.errors.unauthorized ?
                        <span>You are not allowed to save expenses. Please log in.</span> : ''}
                    {this.state.errors.serverError ?
                        <span>Your request could not be processed. Internal server error occured.</span> : ''}
                    <AmountInput amount={expense.amount} onAmountChange={this.handleAmountChange}
                                 displayError={amountInvalid} />
                    <DateInput date={expense.date} onDateChanged={this.handleDateChange}
                               displayError={dateInvalid} />
                    <CategoryInput category={expense.category} onCategoryChanged={this.handleCategoryChange}
                                   displayError={categoryInvalid} />
                    <DescriptionInput description={expense.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <button type="submit" id='add-expense-button'>Save expense</button>
                    {this.state.loading ? <span>Saving...</span> : ''}

                </form>
            </div>
        )
    }
}

export default AddExpense;