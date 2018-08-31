import * as React from "react";

class CategoryInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <label htmlFor="category-input">Category</label>
                <input type="text" id="category-input" value={this.state.value} onChange={this.handleChange} />
            </div>
        )
    }
}

export default CategoryInput;