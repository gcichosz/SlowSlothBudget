import * as React from "react";
import { FormControl } from 'react-bootstrap';

class DescriptionInputField extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onDescriptionChanged(event.target.value);
    }

    render() {
        return (
            <FormControl type="textarea" value={this.props.description} onChange={this.handleChange}
                         placeholder="e.g. Weekly groceries" />
        )
    }
}

export default DescriptionInputField;