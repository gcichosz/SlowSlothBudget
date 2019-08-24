import * as React from "react";
import { Table } from "react-bootstrap";
import CategoryHierarchyRow from "./CategoryHierarchyRow";
import auth0Client from "../Auth/Auth";

class CategoriesHierarchyList extends React.Component {
    static compareCategories(firstCategory, secondCategory) {
        if (firstCategory.order > secondCategory.order) {
            return 1;
        }

        if (firstCategory.order < secondCategory.order) {
            return -1;
        }

        return 0;
    }

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        this.handleCategoryUpButtonClick = this.handleCategoryUpButtonClick.bind(this);
        this.handleCategoryDownButtonClick = this.handleCategoryDownButtonClick.bind(this);
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

    handleCategoryUpButtonClick(categoryName) {
        let category = this.state.categories.find(el => el.name === categoryName);
        if (category === this.state.categories[0]) {
            return;
        }

        let higherCategory = this.state.categories.find(el => el.order === category.order - 1);
        category.order--;
        higherCategory.order++;
        this.setState({
            categories: this.state.categories.sort(CategoriesHierarchyList.compareCategories)
        });
    }

    handleCategoryDownButtonClick(categoryName) {
        let category = this.state.categories.find(el => el.name === categoryName);
        if (category === this.state.categories[this.state.categories.length - 1]) {
            return;
        }

        let lowerCategory = this.state.categories.find(el => el.order === category.order + 1);
        category.order++;
        lowerCategory.order--;
        this.setState({
            categories: this.state.categories.sort(CategoriesHierarchyList.compareCategories)
        });
    }

    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Order</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.categories.map((category) => <CategoryHierarchyRow key={category.name} name={category.name}
                                                                               order={category.order}
                                                                               onCategoryUpButtonClick={this.handleCategoryUpButtonClick}
                                                                               onCategoryDownButtonClick={this.handleCategoryDownButtonClick}
                                                                               firstCategory={category === this.state.categories[0]}
                                                                               lastCategory={category === this.state.categories[this.state.categories.length - 1]} />)}
                </tbody>
            </Table>
        )
    }
}

export default CategoriesHierarchyList;