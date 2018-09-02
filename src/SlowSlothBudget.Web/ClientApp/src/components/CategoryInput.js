import * as React from "react";

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
            <div>
                <label htmlFor="category-input">Category</label>
                <input type="text" id="category-input" value={this.props.category} onChange={this.handleChange} />
            </div>
        )
    }
}

export default CategoryInput;