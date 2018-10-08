import * as React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import 'moment/locale/en-gb';
import { displayFormats } from "../utils/Configuration";
import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.css'

class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onDateChange(value);
    }

    static handleChangeRaw(event) {
        event.target.value = event.target.value.replace(/,/g, '.');
    }

    render() {
        return (
            <DatePicker
                id="date-input"
                selected={this.props.date}
                onChange={this.handleChange}
                onChangeRaw={DateInput.handleChangeRaw}
                locale="en-gb"
                dropdownMode="select"
                dateFormat={displayFormats.dateFormat}
                className="form-control"
                placeholderText={`e.g. ${moment().format(displayFormats.dateFormat)}`}
            />
        )
    }
}

export default DateInput;