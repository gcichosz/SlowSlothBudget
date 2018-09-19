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
        const hasErrorClass = this.props.displayError ? 'has-error' : '';
        return (
            <div className="row">
                <div className={`form-group col-md-3 ${hasErrorClass}`}>
                    <label htmlFor="category-input">Category</label>
                    <input type="text" id="category-input" className="form-control" value={this.props.category}
                           onChange={this.handleChange} placeholder="e.g. Groceries" />
                    {this.props.displayError ? <span className='help-block'>Category field is required</span> : ''}
                </div>
            </div>
        )
    }
}

export default CategoryInput;