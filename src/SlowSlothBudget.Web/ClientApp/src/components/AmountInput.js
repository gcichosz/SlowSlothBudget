import * as React from "react";

class AmountInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.amountInput = React.createRef();
        this.focusAmountInput = this.focusAmountInput.bind(this);
    }

    handleChange(event) {
        this.props.onAmountChange(event.target.value);
    }

    focusAmountInput() {
        this.amountInput.current.focus();
    }

    render() {
        const validationClass = this.props.feedback ? this.props.invalid ? 'has-error' : 'has-success' : '';
        const feedbackClass = this.props.feedback ? 'has-feedback' : '';
        return (
            <div className="row">
                <div className={`form-group col-md-3 ${validationClass} ${feedbackClass}`}>
                    <label htmlFor="amount-input" className="control-label">Amount</label>
                    <div className="input-group">
                        <span className="input-group-addon">PLN</span>
                        <input type="text" id="amount-input" className="form-control" value={this.props.amount}
                               onChange={this.handleChange} placeholder="e.g. 1.23" ref={this.amountInput} />
                    </div>
                    {this.props.feedback ? this.props.invalid ?
                        <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" /> :
                        <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" /> : ''}
                    {this.props.feedback && this.props.invalid ?
                        <span className='help-block'>Amount field is required</span> : ''}
                </div>
            </div>
        )
    }
}

export default AmountInput;