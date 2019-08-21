import * as React from "react";
import { Table } from "react-bootstrap";
import CategoryRow from "../Shared/CategoryRow";
import auth0Client from "../Auth/Auth";

class CategoriesHierarchyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        fetch('/api/categories', {
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
                    <th>Order</th>
                </tr>
                </thead>
                <tbody>
                {this.state.categories.map((category) => <CategoryRow key={category.name} name={category.name}
                                                                      order={category.order} />)}
                </tbody>
            </Table>
        )
    }
}

export default CategoriesHierarchyList;