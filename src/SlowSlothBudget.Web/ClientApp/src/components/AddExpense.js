import React from 'react';
import moment from "moment";
import auth0Client from '../utils/Auth';
import { Col, Row, Alert } from 'react-bootstrap';
import AmountInput from './AmountInput';
import DateInput from "./DateInput";
import CategoryInput from "./CategoryInput";
import DescriptionInput from "./DescriptionInput";
import SaveExpenseButton from "./SaveExpenseButton";
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
        let expense = {...this.state.expense};
        expense.amount = value;
        this.setState({expense: expense});
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
            <Col sm={5} md={4} lg={3}>
                <form id='add-expense-form' onSubmit={this.handleSubmit}>
                    <Row>
                        <h1>Add expense</h1>
                    </Row>
                    {this.state.saved && <Row><Alert bsStyle="success">Expense saved</Alert></Row>}
                    {this.state.errors.badRequest &&
                    <Row><Alert bsStyle="danger">The expense couldn't be saved, because it is incorrect.</Alert></Row>}
                    {this.state.errors.unauthorized &&
                    <Row><Alert bsStyle="danger">Only authenticated users are allowed to save expenses.</Alert></Row>}
                    {this.state.errors.serverError &&
                    <Row><Alert bsStyle="danger">Your request could not be processed. Internal server error
                        occured.</Alert></Row>}
                    <AmountInput amount={expense.amount} onAmountChange={this.handleAmountChange}
                                 invalid={amountInvalid} feedback={this.state.submitted} focusOnDidMount={true} />
                    <DateInput date={expense.date} onDateChanged={this.handleDateChange}
                               invalid={dateInvalid} feedback={this.state.submitted} />
                    <CategoryInput category={expense.category} onCategoryChanged={this.handleCategoryChange}
                                   invalid={categoryInvalid} feedback={this.state.submitted} />
                    <DescriptionInput description={expense.description}
                                      onDescriptionChanged={this.handleDescriptionChanged} />
                    <SaveExpenseButton loading={this.state.loading} />
                </form>
            </Col>
        )
    }
}

export default AddExpense;