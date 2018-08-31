import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/en-gb';

import 'react-datepicker/dist/react-datepicker.css';

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRaw = this.handleChangeRaw.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeRaw(event) {
        event.target.value = event.target.value.replace(/,/g, '.');
        
    }

    render() {
        return (
            <div>
                <label htmlFor="date-input">Date</label>
                <DatePicker
                    id="date-input"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    onChangeRaw={this.handleChangeRaw}
                    locale="en-gb"
                    dropdownMode="select"
                    dateFormat="DD.MM.YYYY"
                />
            </div>
        )
    }
}

export default DateInput;