import React from 'react';
import { Route } from "react-router";
import Layout from './components/Layout';
import AddExpense from "./components/AddExpense";
import Callback from "./components/Callback";
import './App.css';

export default () => (
    <Layout>
        <AddExpense/>
        <Route exact path='/callback' component={Callback}/>
    </Layout>
);
