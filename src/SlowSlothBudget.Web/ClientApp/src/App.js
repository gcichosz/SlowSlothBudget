import React from 'react';
import { Route } from "react-router";
import Layout from './components/Layout';
import AddExpense from "./components/AddExpense";
import ExpensesExplorer from "./components/ExpensesExplorer";
import Callback from "./components/Callback";
import './App.css';
import YearAverages from "./components/YearAverages";

export default () => (
    <Layout>
        <Route exact path="/" component={AddExpense} />
        <Route exact path="/expensesexplorer" component={ExpensesExplorer}/>
        <Route exact path="/yearaverages" component={YearAverages}/>
        <Route exact path='/callback' component={Callback} />
    </Layout>
);
