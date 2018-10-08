import * as React from "react";
import { FormControl } from 'react-bootstrap';

class CategoryInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCategoryChanged(event.target.value);
    }

    render() {
        return (
            <FormControl type="text" value={this.props.category} onChange={this.handleChange}
                         placeholder="e.g. Groceries" />
        )
    }
}

export default CategoryInput;