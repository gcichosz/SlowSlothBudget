import React from 'react';
import moment from "moment";
import auth0Client from '../utils/Auth';
import AmountInput from './AmountInput';
import DateInput from "./DateInput";
import CategoryInput from "./CategoryInput";
import DescriptionInput from "./DescriptionInput";
import './AddExpense.css'
import SaveExpenseButton from "./SaveExpenseButton";

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

        this.amountInput = React.createRef();
    }

    componentDidMount() {
        this.amountInput.current.focusAmountInput();
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
        return (
            <div>
                <form id='add-expense-form' onSubmit={this.handleSubmit}>
                    <h1>Add expense</h1>
                    {this.state.saved ? <div className="alert alert-success">Expense saved</div> : ''}
                    {this.state.errors.badRequest ?
                        <div className="alert alert-danger">The expense couldn't be saved, because it is
                            incorrect.</div> : ''}
                    {this.state.errors.unauthorized ?
                        <div className="alert alert-danger">Only authenticated users are allowed to save
                            expenses.</div> : ''}
                    {this.state.errors.serverError ?
                        <div className="alert alert-danger">Your request could not be processed. Internal server error
                            occured.</div> : ''}
                    <AmountInput amount={expense.amount} onAmountChange={this.handleAmountChange}
                                 invalid={amountInvalid} feedback={this.state.submitted}
                                 ref={this.amountInput} />
                    <DateInput date={expense.date} onDateChanged={this.handleDateChange}
                               invalid={dateInvalid} feedback={this.state.submitted} />
                    <CategoryInput category={expense.category} onCategoryChanged={this.handleCategoryChange}
                                   invalid={categoryInvalid} feedback={this.state.submitted} />
                    <DescriptionInput description={expense.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <SaveExpenseButton loading={this.state.loading} />
                </form>
            </div>
        )
    }
}

export default AddExpense;