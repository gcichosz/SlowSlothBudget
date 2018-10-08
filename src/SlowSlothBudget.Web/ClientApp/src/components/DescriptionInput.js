import * as React from "react";
import { Row, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DescriptionInputField from "./DescriptionInputField";

class DescriptionInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onDescriptionChanged(value);
    }

    render() {
        return (
            <Row>
                <FormGroup controlId="description-input">
                    <ControlLabel>Description (optional)</ControlLabel>
                    <DescriptionInputField value={this.props.description} onDescriptionChanged={this.handleChange} />
                </FormGroup>
            </Row>
        )
    }
}

export default DescriptionInput;