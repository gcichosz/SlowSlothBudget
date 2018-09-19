import React from 'react';
import DatePicker from 'react-datepicker';
import moment from "moment";
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
        const validationClass = this.props.feedback ? this.props.invalid ? 'has-error' : 'has-success' : '';
        const feedbackClass = this.props.feedback ? 'has-feedback' : '';
        return (
            <div className="row">
                <div className={`form-group col-md-3 ${validationClass} ${feedbackClass}`}>
                    <label htmlFor="date-input" className="control-label">Date</label>
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
                    {this.props.feedback ? this.props.invalid ?
                        <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" /> :
                        <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" /> : ''}
                    {this.props.feedback && this.props.invalid ?
                        <span className='help-block'>Date field is required</span> : ''}
                </div>
            </div>
        )
    }
}

export default DateInput;