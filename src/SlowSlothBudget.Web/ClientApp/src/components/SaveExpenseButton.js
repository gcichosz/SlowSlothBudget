import * as React from "react";
import { Row, Glyphicon, Button } from 'react-bootstrap';

class SaveExpenseButton extends React.Component {
    render() {
        return (
            <Row>
                <Button type="submit" id='add-expense-button' bsStyle="primary"
                        disabled={this.props.loading}>{this.props.loading ?
                    <span>Saving expense <Glyphicon glyph="usd"
                                                    id="add-expense-loader" /></span> : 'Save expense'}</Button>
            </Row>
        )
    }
}

export default SaveExpenseButton;