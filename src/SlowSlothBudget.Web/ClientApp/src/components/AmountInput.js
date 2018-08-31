import * as React from "react";

class AmountInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const newValue = event.target.value;
        const currencyAmountRegex = /^\d+(([.,])\d{0,2})?$/;
        if (!newValue || currencyAmountRegex.test(event.target.value)) {
            this.setState({value: newValue});
        }
    }

    render() {
        return (
            <div>
                <label htmlFor="amount-input">Amount</label>
                <input type="text" id="amount-input" value={this.state.value} onChange={this.handleChange} />
                <span> PLN</span>
            </div>
        )
    }
}

export default AmountInput;