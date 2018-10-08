import * as React from "react";
import { Row, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DescriptionInput from "./DescriptionInput";

class DescriptionInputFormGroup extends React.Component {
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
                    <DescriptionInput value={this.props.description} onDescriptionChanged={this.handleChange} />
                </FormGroup>
            </Row>
        )
    }
}

export default DescriptionInputFormGroup;