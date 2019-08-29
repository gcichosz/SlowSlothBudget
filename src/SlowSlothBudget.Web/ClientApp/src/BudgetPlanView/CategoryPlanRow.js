import * as React from "react";

class CategoryPlanRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.plannedAmount}
                </td>
                <td>
                    {this.props.currentAmount}
                </td>
                <td>
                    {this.props.plannedAmount - this.props.currentAmount}
                </td>
            </tr>
        )
    }
}

export default CategoryPlanRow;