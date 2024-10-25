import React from 'react';

const ExpenseList = ({ expenses }) => {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <div class='list'>
            <h2>Total: {totalAmount}</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.name} - ₹{expense.amount} [{expense.category}]
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
