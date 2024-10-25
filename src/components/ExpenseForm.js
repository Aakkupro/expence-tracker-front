import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ fetchExpenses, editingExpense, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', amount: '', category: '', date: '' });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                name: editingExpense.name,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date ? new Date(editingExpense.date).toISOString().substring(0, 10) : '',
            });
        } else {
            setFormData({ name: '', amount: '', category: '', date: '' });
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, amount, category, date } = formData;
    
            // Validate date
            const dateValue = date ? new Date(date) : null;
    
            if (dateValue && isNaN(dateValue.getTime())) {
                console.error('Invalid date value:', date);
                throw new Error('Invalid date value');
            }
    
            const expenseData = {
                name,
                amount,
                category,
                date: dateValue ? dateValue.toISOString() : null, // Convert to ISO format
            };
    
            await onSubmit(expenseData);
            setFormData({ name: '', amount: '', category: '', date: '' });
        } catch (error) {
            console.error('Error submitting expense:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
            <select class='select' name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select a category</option>
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
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
        </form>
    );
};

export default ExpenseForm;
