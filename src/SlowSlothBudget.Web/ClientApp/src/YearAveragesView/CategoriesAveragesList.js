import * as React from "react";
import { Table } from "react-bootstrap";
import CategoryAverageRow from "./CategoryAverageRow";
import auth0Client from "../Auth/Auth";

class CategoriesAveragesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        fetch('/api/statistics/lastYearAverages', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${auth0Client.getIdToken()}`
            }
        }).then(response => response.json()).then(result => this.setState({categories: result}));
    }

    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {this.state.categories.map((category) => <CategoryAverageRow key={category.name} name={category.name}
                                                                             amount={category.amount} />)}
                <CategoryAverageRow name={"Sum"}
                                    amount={this.state.categories.reduce((accumulator, currentCategory) => accumulator + currentCategory.amount, 0)} />
                </tbody>
            </Table>
        )
    }
}

export default CategoriesAveragesList;