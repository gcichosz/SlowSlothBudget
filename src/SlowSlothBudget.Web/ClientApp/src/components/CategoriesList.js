import * as React from "react";
import { Table } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import auth0Client from "../utils/Auth";

class CategoriesList extends React.Component {
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
                {this.state.categories.map((category) => <CategoryRow name={category.name}
                                                                      amount={category.amount} />)}
                </tbody>
            </Table>
        )
    }
}

export default CategoriesList;