import * as React from "react";
import { Row, FormGroup, ControlLabel, FormControl, Glyphicon, HelpBlock } from 'react-bootstrap';
import CategoryInput from "./CategoryInput";

class CategoryInputFormGroup extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onCategoryChange(value);
    }

    render() {
        const validationState = this.props.feedback ? (this.props.invalid ? 'error' : 'success') : null;
        return (
            <Row>
                <FormGroup validationState={validationState} controlId="category-input">
                    <ControlLabel>Category</ControlLabel>
                    <CategoryInput category={this.props.category} onCategoryChange={this.handleChange} />
                    <FormControl.Feedback>
                        <Glyphicon glyph={this.props.feedback ? (this.props.invalid ? 'remove' : 'ok') : ''} />
                    </FormControl.Feedback>
                    {this.props.feedback && this.props.invalid &&
                    <HelpBlock className='help-block'>Category field is required</HelpBlock>}
                </FormGroup>
            </Row>
        )
    }
}

export default CategoryInputFormGroup;