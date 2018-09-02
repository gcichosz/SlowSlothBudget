import * as React from "react";

class DescriptionInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onDescriptionChanged(event.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="description-input">Description</label>
                <textarea id="description-input" value={this.props.description} onChange={this.handleChange} />
            </div>
        )
    }
}

export default DescriptionInput;