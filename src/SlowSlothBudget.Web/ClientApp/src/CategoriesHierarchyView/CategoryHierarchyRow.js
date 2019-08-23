import * as React from "react";

class CategoryHierarchyRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.order}
                </td>
            </tr>
        )
    }
}

export default CategoryHierarchyRow;