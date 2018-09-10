import React from 'react';
import DatePicker from 'react-datepicker';
import 'moment/locale/en-gb';

import 'react-datepicker/dist/react-datepicker.css';

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
        return (
            <div className={this.props.displayError ? 'displayError' : ''}>
                <label htmlFor="date-input">Date</label>
                <DatePicker
                    id="date-input"
                    selected={this.props.date}
                    onChange={this.handleChange}
                    onChangeRaw={this.handleChangeRaw}
                    locale="en-gb"
                    dropdownMode="select"
                    dateFormat="DD.MM.YYYY"
                />
                <span className='errorMessage'>Date field is required</span>
            </div>
        )
    }
}

export default DateInput;