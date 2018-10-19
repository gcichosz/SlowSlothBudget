import * as React from "react";
import { Table } from "react-bootstrap";
import CategoryRow from "./CategoryRow";

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            categories: []
        }
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
                {this.state.categories.map((category) => <CategoryRow />)}
                </tbody>
            </Table>
        )
    }
}

export default CategoriesList;