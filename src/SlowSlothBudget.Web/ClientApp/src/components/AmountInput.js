import * as React from "react";

class AmountInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onAmountChange(event.target.value);
    }

    render() {
        return (
            <div>
                <label htmlFor="amount-input">Amount</label>
                <input type="text" id="amount-input" value={this.props.amount} onChange={this.handleChange} />
                <span> PLN</span>
            </div>
        )
    }
}

export default AmountInput;