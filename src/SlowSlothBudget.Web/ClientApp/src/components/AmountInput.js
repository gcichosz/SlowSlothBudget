import * as React from "react";
import { Row, FormGroup, ControlLabel, InputGroup, FormControl, Glyphicon, HelpBlock } from 'react-bootstrap';
import AmountInputField from "./AmountInputField";

class AmountInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.amountInput = React.createRef();
    }

    componentDidMount() {
        this.amountInput.current.focusAmountInput();
    }

    handleChange(value) {
        this.props.onAmountChange(value);
    }

    render() {
        const validationState = this.props.feedback ? (this.props.invalid ? 'error' : 'success') : null;
        return (
            <Row>
                <FormGroup validationState={validationState} controlId="amount-input">
                    <ControlLabel>Amount</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>PLN</InputGroup.Addon>
                        <AmountInputField amount={this.props.amount} onAmountChange={this.handleChange}
                                          ref={this.amountInput} />
                    </InputGroup>
                    <FormControl.Feedback>
                        <Glyphicon glyph={this.props.feedback ? (this.props.invalid ? 'remove' : 'ok') : ''} />
                    </FormControl.Feedback>
                    {this.props.feedback && this.props.invalid &&
                    <HelpBlock className='help-block'>Amount field is required</HelpBlock>}
                </FormGroup>
            </Row>
        )
    }
}

export default AmountInput;