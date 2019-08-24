import * as React from "react";
import { Button, ButtonToolbar, Glyphicon } from "react-bootstrap";

class CategoryHierarchyRow extends React.Component {
    constructor(props) {
        super(props);

        this.handleCategoryUpButtonClick = this.handleCategoryUpButtonClick.bind(this);
        this.handleCategoryDownButtonClick = this.handleCategoryDownButtonClick.bind(this);
    }

    handleCategoryUpButtonClick() {
        this.props.onCategoryUpButtonClick(this.props.name)
    }

    handleCategoryDownButtonClick() {
        this.props.onCategoryDownButtonClick(this.props.name)
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.order}
                </td>
                <td>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.handleCategoryUpButtonClick}><Glyphicon
                            glyph="arrow-up" /></Button>
                        <Button bsStyle="primary" onClick={this.handleCategoryDownButtonClick}><Glyphicon
                            glyph="arrow-down" /></Button>
                    </ButtonToolbar>
                </td>
            </tr>
        )
    }
}

export default CategoryHierarchyRow;