import React from 'react';
import { Row, FormGroup, ControlLabel, FormControl, Glyphicon, HelpBlock } from 'react-bootstrap';
import DateInputField from "./DateInputField";

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.props.onDateChanged(date);
    }

    render() {
        const validationState = this.props.feedback ? (this.props.invalid ? 'error' : 'success') : null;
        return (
            <Row>
                <FormGroup validationState={validationState} controlId="date-input">
                    <ControlLabel>Date</ControlLabel>
                    <DateInputField date={this.props.date} onDateChange={this.handleChange} />
                    <FormControl.Feedback>
                        <Glyphicon glyph={this.props.feedback ? (this.props.invalid ? 'remove' : 'ok') : ''} />
                    </FormControl.Feedback>
                    {this.props.feedback && this.props.invalid &&
                    <HelpBlock className='help-block'>Date field is required</HelpBlock>}
                </FormGroup>
            </Row>
        )
    }
}

export default DateInput;