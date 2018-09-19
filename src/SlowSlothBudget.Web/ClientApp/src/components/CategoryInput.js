import * as React from "react";
import { Row, FormGroup, ControlLabel, FormControl, Glyphicon, HelpBlock } from 'react-bootstrap';

class CategoryInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCategoryChanged(event.target.value);
    }

    render() {
        const validationState = this.props.feedback && (this.props.invalid ? 'error' : 'success');
        return (
            <Row>
                <FormGroup validationState={validationState} controlId="category-input">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl type="text" value={this.props.category} onChange={this.handleChange}
                                 placeholder="e.g. Groceries" />
                    <FormControl.Feedback>
                        <Glyphicon glyph={this.props.feedback && (this.props.invalid ? 'remove' : 'ok')} />
                    </FormControl.Feedback>
                    {this.props.feedback && this.props.invalid &&
                    <HelpBlock className='help-block'>Category field is required</HelpBlock>}
                </FormGroup>
            </Row>
        )
    }
}

export default CategoryInput;