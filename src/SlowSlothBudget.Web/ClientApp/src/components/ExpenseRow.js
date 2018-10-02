import * as React from "react";
import moment from "moment";
import { Button, Glyphicon } from "react-bootstrap";
import { displayFormats } from "../utils/Configuration";

class ExpenseRow extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleDeleteButtonClick() {
        this.props.onDeleteButtonClick(this.props.expense.id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.expense.amount.toFixed(2)}</td>
                <td>{this.props.expense.category}</td>
                <td>{moment(this.props.expense.date).format(displayFormats.dateFormat)}</td>
                <td>{this.props.expense.description}</td>
                <td><Button bsStyle="danger" onClick={this.handleDeleteButtonClick}><Glyphicon
                    glyph="trash" /> Delete</Button></td>
            </tr>
        )
    }
}

export default ExpenseRow;