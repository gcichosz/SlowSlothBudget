import * as React from "react";
import { FormControl } from 'react-bootstrap';

class AmountInputField extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.focusAmountInput = this.focusAmountInput.bind(this);

        this.amountInput = React.createRef();
    }

    handleChange(event) {
        let value = event.target.value;
        const currencyAmountRegex = /^\d+(([.,])\d{0,2})?$/;
        if (!value || currencyAmountRegex.test(value)) {
            value = value.replace(/,/g, '.');
            this.props.onAmountChange(value);
        }
    }

    focusAmountInput() {
        this.amountInput.focus();
    }

    render() {
        return (
            <FormControl type="text" value={this.props.amount} onChange={this.handleChange} placeholder="e.g. 1.23"
                         inputRef={ref => {
                             this.amountInput = ref;
                         }} />
        )
    }
}

export default AmountInputField;