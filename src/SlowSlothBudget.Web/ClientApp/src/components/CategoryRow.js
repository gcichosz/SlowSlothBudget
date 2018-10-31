import * as React from "react";

class CategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {parseFloat(this.props.amount).toFixed(2)}
                </td>
            </tr>
        )
    }
}

export default CategoryRow;