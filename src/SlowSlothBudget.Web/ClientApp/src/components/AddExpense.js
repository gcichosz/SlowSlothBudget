import React from 'react';
import AmountInput from './AmountInput';
import auth0Client from '../utils/Auth';

const AddExpense = () => (
    <div>
        <h1>Welcome to Slow Sloth Budget</h1>
        {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
        <AmountInput />
    </div>
);

export default AddExpense;