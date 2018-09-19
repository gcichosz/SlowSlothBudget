import * as React from "react";
import { Row, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon, HelpBlock } from 'react-bootstrap';

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
        const validationState = this.props.feedback && (this.props.invalid ? 'error' : 'success');
        return (
            <Row>
                <FormGroup validationState={validationState} controlId="amount-input">
                    <ControlLabel>Amount</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>PLN</InputGroup.Addon>
                        <FormControl type="text" value={this.props.amount} onChange={this.handleChange}
                                     placeholder="e.g. 1.23" inputRef={this.amountInput} />
                    </InputGroup>
                    <FormControl.Feedback>
                        <Glyphicon glyph={this.props.feedback && (this.props.invalid ? 'remove' : 'ok')} />
                    </FormControl.Feedback>
                    {this.props.feedback && this.props.invalid &&
                    <HelpBlock className='help-block'>Amount field is required</HelpBlock>}
                </FormGroup>
            </Row>
        )
    }
}

export default AmountInput;