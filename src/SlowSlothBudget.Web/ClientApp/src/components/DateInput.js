import React from 'react';
import DatePicker from 'react-datepicker';
import moment from "moment";
import { Row, FormGroup, ControlLabel, FormControl, Glyphicon, HelpBlock } from 'react-bootstrap';
import 'moment/locale/en-gb';
import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.css'

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRaw = this.handleChangeRaw.bind(this);
    }

    handleChange(date) {
        this.props.onDateChanged(date);
    }

    handleChangeRaw(event) {
        event.target.value = event.target.value.replace(/,/g, '.');
    }

    render() {
        const validationState = this.props.feedback && (this.props.invalid ? 'error' : 'success');
        return (
            <Row>
                <FormGroup validationState={validationState} controlId="date-input">
                    <ControlLabel>Date</ControlLabel>
                    <DatePicker
                        id="date-input"
                        selected={this.props.date}
                        onChange={this.handleChange}
                        onChangeRaw={this.handleChangeRaw}
                        locale="en-gb"
                        dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        className="form-control"
                        placeholderText={`e.g. ${moment().format('DD.MM.YYYY')}`}
                    />
                    <FormControl.Feedback>
                        <Glyphicon glyph={this.props.feedback && (this.props.invalid ? 'remove' : 'ok')} />
                    </FormControl.Feedback>
                    {this.props.feedback && this.props.invalid &&
                    <HelpBlock className='help-block'>Date field is required</HelpBlock>}
                </FormGroup>
            </Row>
        )
    }
}

export default DateInput;