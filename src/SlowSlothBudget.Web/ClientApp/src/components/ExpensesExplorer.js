import * as React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";

class ExpensesExplorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                category: '',
                description: ''
            }
        }
    }

    handleInputChange(field, value) {
        let filter = {...this.state.filter};
        filter[field] = value;
        this.setState({filter: filter});
    }

    render() {
        let filter = this.state.filter;
        return (
            <div>
                <ExpensesFilter category={filter.category}
                                onCategoryChange={(category) => this.handleInputChange("category", category)}
                                description={filter.description}
                                onDescriptionChange={(description) => this.handleInputChange("description", description)} />
                <ExpensesList />
            </div>
        )
    }
}

export default ExpensesExplorer;