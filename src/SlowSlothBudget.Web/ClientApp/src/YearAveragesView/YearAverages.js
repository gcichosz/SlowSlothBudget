import * as React from "react";
import CategoriesAveragesList from "./CategoriesAveragesList";

class YearAverages extends React.Component {
    render() {
        return (
            <div>
                <h1>Average expenses from last 12 months</h1>
                <CategoriesAveragesList />
            </div>
        )
    }
}

export default YearAverages;