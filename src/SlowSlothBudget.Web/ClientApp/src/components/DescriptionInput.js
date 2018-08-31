import * as React from "react";

class DescriptionInput extends React.Component {
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
                <label htmlFor="description-input">Description</label>
                <textarea id="description-input" value={this.state.value} onChange={this.handleChange} />
            </div>
        )
    }
}

export default DescriptionInput;