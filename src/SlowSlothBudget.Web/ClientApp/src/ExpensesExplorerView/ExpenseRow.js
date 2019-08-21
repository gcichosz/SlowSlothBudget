import * as React from "react";
import moment from "moment";
import { Button, ButtonToolbar, Glyphicon } from "react-bootstrap";
import { displayFormats } from "../Configuration/Configuration";
import AmountInput from "../Shared/AmountInput";
import DateInput from "../Shared/DateInput";
import CategoryInput from "../Shared/CategoryInput";
import DescriptionInput from "../Shared/DescriptionInput";

class ExpenseRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edited: false,
            pristineExpense: {}
        };

        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleEditButtonClick() {
        this.setState({edited: true, pristineExpense: {...this.props.expense}});
    }

    handleSaveButtonClick() {
        this.props.onSaveButtonClick(this.props.expense, this.state.pristineExpense);
        this.setState({edited: false});
    }

    handleCancelButtonClick() {
        this.props.onExpenseChange(this.state.pristineExpense);
        this.setState({edited: false});
    }

    handleDeleteButtonClick() {
        this.props.onDeleteButtonClick(this.props.expense.id);
    }

    handleInputChange(field, value) {
        let expense = {...this.props.expense};
        expense[field] = value;
        this.props.onExpenseChange(expense);
    }

    render() {
        const edited = this.state.edited;
        const expense = this.props.expense;
        return (
            <tr>
                <td>{edited ? <AmountInput amount={expense.amount}
                                           onAmountChange={(amount) => this.handleInputChange("amount", amount)} />
                    : parseFloat(expense.amount).toFixed(2)}</td>
                <td>{edited ? <DateInput date={moment(expense.date)}
                                         onDateChange={(date) => this.handleInputChange("date", date)} /> : moment(expense.date).format(displayFormats.dateFormat)}</td>
                <td>{edited ? <CategoryInput category={expense.category}
                                             onCategoryChange={(category) => this.handleInputChange("category", category)} /> : expense.category}</td>
                <td>{edited ? <DescriptionInput description={expense.description}
                                                onDescriptionChange={(description) => this.handleInputChange("description", description)} /> : expense.description}</td>
                <td>
                    <ButtonToolbar>{edited ? <Button bsStyle="success" onClick={this.handleSaveButtonClick}><Glyphicon
                            glyph="check" /> Save</Button> :
                        <Button bsStyle="primary" onClick={this.handleEditButtonClick}><Glyphicon
                            glyph="edit" /> Edit</Button>}
                        {edited ? <Button bsStyle="danger" onClick={this.handleCancelButtonClick}><Glyphicon
                                glyph="remove" /> Cancel</Button> :
                            <Button bsStyle="danger" onClick={this.handleDeleteButtonClick}><Glyphicon
                                glyph="trash" /> Delete</Button>}</ButtonToolbar>
                </td>
            </tr>
        )
    }
}

export default ExpenseRow;