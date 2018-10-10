import * as React from "react";
import { Row, FormGroup, ControlLabel } from 'react-bootstrap';
import DescriptionInput from "./DescriptionInput";

class DescriptionInputFormGroup extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onDescriptionChange(value);
    }

    render() {
        return (
            <Row>
                <FormGroup controlId="description-input">
                    <ControlLabel>Description (optional)</ControlLabel>
                    <DescriptionInput value={this.props.description} onDescriptionChange={this.handleChange} />
                </FormGroup>
            </Row>
        )
    }
}

export default DescriptionInputFormGroup;