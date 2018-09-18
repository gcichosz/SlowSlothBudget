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
            <div className="form-group">
                <label htmlFor="description-input">Description</label>
                <textarea id="description-input" className="form-control" value={this.props.description}
                          onChange={this.handleChange} placeholder="e.g. Weekly groceries" />
            </div>
        )
    }
}

export default DescriptionInput;