import * as React from "react";

class CategoryInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onCategoryChanged(event.target.value);
    }

    render() {
        const validationClass = this.props.feedback ? this.props.invalid ? 'has-error' : 'has-success' : '';
        const feedbackClass = this.props.feedback ? 'has-feedback' : '';
        return (
            <div className="row">
                <div className={`form-group col-md-3 ${validationClass} ${feedbackClass}`}>
                    <label htmlFor="category-input">Category</label>
                    <input type="text" id="category-input" className="form-control" value={this.props.category}
                           onChange={this.handleChange} placeholder="e.g. Groceries" />
                    {this.props.feedback ? this.props.invalid ?
                        <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" /> :
                        <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true" /> : ''}
                    {this.props.feedback && this.props.invalid ?
                        <span className='help-block'>Category field is required</span> : ''}
                </div>
            </div>
        )
    }
}

export default CategoryInput;