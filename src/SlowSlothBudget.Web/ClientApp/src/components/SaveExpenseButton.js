import * as React from "react";

class SaveExpenseButton extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <button type="submit" id='add-expense-button' className="btn btn-primary btn-block"
                            disabled={this.props.loading}>{this.props.loading ?
                        <span className="glyphicon glyphicon-usd" id="add-expense-loader" /> : 'Save expense'}</button>

                </div>
            </div>
        )
    }
}

export default SaveExpenseButton;