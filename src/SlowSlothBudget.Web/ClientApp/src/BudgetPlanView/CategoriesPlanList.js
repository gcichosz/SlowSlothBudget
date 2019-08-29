import * as React from "react";
import { Button, Table } from "react-bootstrap";
import CategoryPlanRow from "./CategoryPlanRow";

class CategoriesPlanList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th>Planned</th>
                        <th>Current</th>
                        <th>Left</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.map((category) => <CategoryPlanRow key={category.name} name={category.name}
                                                                              plannedAmount={category.plannedAmount}
                                                                              currentAmount={category.currentAmount} />)}
                    </tbody>
                </Table>
                <Button type="submit" id='save-budget-plan-button' bsStyle="primary">Save budget plan</Button>
            </div>
        )
    }
}

export default CategoriesPlanList;