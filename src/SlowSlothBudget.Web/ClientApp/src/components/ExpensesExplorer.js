import * as React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";

class ExpensesExplorer extends React.Component {
    render() {
        return (
            <div>
                <ExpensesFilter />
                <ExpensesList />
            </div>
        )
    }
}

export default ExpensesExplorer;