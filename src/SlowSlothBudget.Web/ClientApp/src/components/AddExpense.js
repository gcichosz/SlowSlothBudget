import React from 'react';
import auth0Client from "../utils/Auth";

const AddExpense = () => (
    <div>
        <h1>Welcome to Slow Sloth Budget</h1>
        {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
    </div>
);

export default AddExpense;