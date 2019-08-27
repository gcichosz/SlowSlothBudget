import React from 'react';
import { Route } from "react-router";
import Layout from './Layout';
import PrivateRoute from "../Navigation/PrivateRoute";
import AddExpense from "../AddExpenseView/AddExpense";
import ExpensesExplorer from "../ExpensesExplorerView/ExpensesExplorer";
import YearAverages from "../YearAveragesView/YearAverages";
import CategoriesHierarchy from "../CategoriesHierarchyView/CategoriesHierarchy";
import BudgetPlan from "../BudgetPlanView/BudgetPlan";
import Callback from "../Auth/Callback";
import { Row } from "react-bootstrap";
import './App.css';

export default () => (
    <Layout>
        <Route exact path="/login" render={() => <Row><h1>Please log in</h1></Row>} />
        <PrivateRoute exact path="/" component={AddExpense} />
        <PrivateRoute exact path="/addexpense" component={AddExpense} />
        <PrivateRoute exact path="/expensesexplorer" component={ExpensesExplorer} />
        <PrivateRoute exact path="/yearaverages" component={YearAverages} />
        <PrivateRoute exact path="/categorieshierarchy" component={CategoriesHierarchy} />
        <PrivateRoute exact path="/budgetplan" component={BudgetPlan} />
        <Route exact path='/callback' component={Callback} />
    </Layout>
);
