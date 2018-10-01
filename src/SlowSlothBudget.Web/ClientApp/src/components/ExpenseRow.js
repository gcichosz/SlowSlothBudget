import * as React from "react";
import moment from "moment";
import { displayFormats } from "../utils/Configuration";

class ExpenseRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.expense.amount.toFixed(2)}</td>
                <td>{this.props.expense.category}</td>
                <td>{moment(this.props.expense.date).format(displayFormats.dateFormat)}</td>
                <td>{this.props.expense.description}</td>
            </tr>
        )
    }
}

export default ExpenseRow;