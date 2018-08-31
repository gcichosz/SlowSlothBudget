import React from 'react';
import auth0Client from '../utils/Auth';
import AmountInput from './AmountInput';
import DateInput from "./DateInput";
import CategoryInput from "./CategoryInput";
import DescriptionInput from "./DescriptionInput";

const AddExpense = () => (
    <div>
        <h1>Welcome to Slow Sloth Budget</h1>
        {auth0Client.isAuthenticated() ? <h2>Anonymous users shouldn't see this</h2> : ''}
        <AmountInput />
        <DateInput />
        <CategoryInput/>
        <DescriptionInput/>
    </div>
);

export default AddExpense;