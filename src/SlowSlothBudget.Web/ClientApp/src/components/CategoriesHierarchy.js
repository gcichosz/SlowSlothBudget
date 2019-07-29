import * as React from "react";
import CategoriesHierarchyList from "./CategoriesHierarchyList";

class CategoriesHierarchy extends React.Component {
    render() {
        return (
            <div>
                <h1>Categories hierarchy</h1>
                <CategoriesHierarchyList />
            </div>
        )
    }
}

export default CategoriesHierarchy;