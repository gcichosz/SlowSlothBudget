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
            <div className={this.props.displayError ? 'displayError' : ''}>
                <label htmlFor="amount-input">Amount</label>
                <input type="text" id="amount-input" value={this.props.amount} onChange={this.handleChange} />
                <span> PLN</span>
                <span className='errorMessage'>Amount field is required</span>
            </div>
        )
    }
}

export default AmountInput;