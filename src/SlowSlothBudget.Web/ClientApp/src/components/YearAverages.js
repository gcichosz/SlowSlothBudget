import * as React from "react";
import CategoriesList from "./CategoriesList";

class YearAverages extends React.Component {
    render() {
        return (
            <div>
                <h1>Average expenses from last 12 months</h1>
                <CategoriesList />
            </div>
        )
    }
}

export default YearAverages;