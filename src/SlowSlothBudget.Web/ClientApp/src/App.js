import React from 'react';
import { Route } from "react-router";
import Layout from './components/Layout';
import PrivateRoute from "./components/PrivateRoute";
import AddExpense from "./components/AddExpense";
import ExpensesExplorer from "./components/ExpensesExplorer";
import YearAverages from "./components/YearAverages";
import Callback from "./components/Callback";
import { Row } from "react-bootstrap";
import './App.css';

export default () => (
    <Layout>
        <Route exact path="/login" render={() => <Row><h1>Please log in</h1></Row>} />
        <PrivateRoute exact path="/" component={AddExpense} />
        <PrivateRoute exact path="/addexpense" component={AddExpense} />
        <PrivateRoute exact path="/expensesexplorer" component={ExpensesExplorer} />
        <PrivateRoute exact path="/yearaverages" component={YearAverages} />
        <Route exact path='/callback' component={Callback} />
    </Layout>
);
