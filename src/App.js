// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import './App.css';

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleSubmit = async (expenseData) => {
        try {
            if (editingExpense) {
                await axios.put(`http://localhost:5000/api/expenses/${editingExpense._id}`, expenseData);
                setEditingExpense(null);
            } else {
                await axios.post('http://localhost:5000/api/expenses', expenseData);
            }
            fetchExpenses(); // Refresh the expense list
        } catch (error) {
            console.error('Error adding/updating expense:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${id}`);
            fetchExpenses(); // Refresh the expense list
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

    const totalCost = expenses.reduce((total, expense) => total + expense.amount, 0);

    const filteredExpenses = expenses.filter((expense) => {
        const isCategoryMatch = filterCategory ? expense.category === filterCategory : true;
        const isDateInRange = startDate && endDate ?
            new Date(expense.date) >= new Date(startDate) && new Date(expense.date) <= new Date(endDate)
            : true;
        return isCategoryMatch && isDateInRange;
    });


    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <ExpenseForm fetchExpenses={fetchExpenses} editingExpense={editingExpense} onSubmit={handleSubmit} />
            <h2>Total Cost: ₹{totalCost}</h2>

            <div class='cd'>
                <select id='selector' onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                    <option value="laundry">Laundry</option>
                    <option value="electricity">Electricity</option>
                    <option value="wifi bill">WiFi Bill</option>
                    <option value="water bill">Water Bill</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="groceries">Groceries</option>
                    <option value="rent">Rent</option>
                    <option value="medical">Medical</option>
                    <option value="others">Others</option>
                </select>
                <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <ul class='ul'>
                {filteredExpenses.map((expense) => (
                    <li key={expense._id}>
                        <div>{expense.name} - ₹{expense.amount} ({expense.category})</div>
                        <div>{new Date(expense.date).toLocaleDateString()}</div>
                        <div>
                            <button class='edit' onClick={() => handleEdit(expense)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </button>
                            <button class='edit' id='dlt' onClick={() => handleDelete(expense._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                </svg>
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
