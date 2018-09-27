import React from 'react';
import { Route } from "react-router";
import Layout from './components/Layout';
import AddExpense from "./components/AddExpense";
import ExpensesExplorer from "./components/ExpensesExplorer";
import Callback from "./components/Callback";
import './App.css';

export default () => (
    <Layout>
        <Route exact path="/" component={AddExpense} />
        <Route exact path="/expensesexplorer" component={ExpensesExplorer}/>
        <Route exact path='/callback' component={Callback} />
    </Layout>
);
