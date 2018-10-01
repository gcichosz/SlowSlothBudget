import * as React from "react";
import ExpensesList from "./ExpensesList";

class ExpensesExplorer extends React.Component {
    render() {
        return (
            <div>
                <h1>Expenses list</h1>
                <ExpensesList />
            </div>
        )
    }
}

export default ExpensesExplorer;