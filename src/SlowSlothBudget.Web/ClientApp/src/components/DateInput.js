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
        const hasErrorClass = this.props.displayError ? 'has-error' : '';
        return (
            <div className="row">
                <div className={`form-group col-md-3 ${hasErrorClass}`}>
                    <label htmlFor="date-input">Date</label>
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
                    {this.props.displayError ? <span className='help-block'>Date field is required</span> : ''}
                </div>
            </div>
        )
    }
}

export default DateInput;