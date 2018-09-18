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
            <div className="row">
                <div className="form-group col-md-3">
                    <label htmlFor="description-input">Description (optional)</label>
                    <textarea id="description-input" className="form-control" value={this.props.description}
                              onChange={this.handleChange} placeholder="e.g. Weekly groceries" />
                </div>
            </div>
        )
    }
}

export default DescriptionInput;