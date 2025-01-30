
const { v4: uuidv4 } = require('uuid');
const { User, Expense } = require('../models/user.model');

module.exports.createExpenseService = async (userId, expenseData) => {
    try {
        const newExpense = new Expense({
            id: uuidv4(),
            amount: expenseData.amount,
            category: expenseData.category,
            description: expenseData.description,
        });

        const savedExpense = await newExpense.save();

        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            { $push: { expenses: savedExpense._id } },
            { new: true }
        );

        if (!updatedUser) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            data: {
                user: updatedUser,
                expense: savedExpense,
            },
            message: 'Expense created successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports.updateExpenseService = async (id, updatedExpenseData) => {
    const existingExpense = await Expense.findOne({ id: id });

    if (!existingExpense) {
        return {
            success: false,
            message: 'Expense not found'
        };
    }

    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { id: id },
            {
                amount: updatedExpenseData.amount || existingExpense.amount,
                category: updatedExpenseData.category || existingExpense.category,
                description: updatedExpenseData.description || existingExpense.description,
            },
            { new: true }
        );

        return {
            success: true,
            data: updatedExpense,
            message: 'Expense updated successfully'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};

module.exports.getExpenseService = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
    try {
        const user = await User.findOne({ id: userId }).populate({
            path: "expenses",
            options: { skip: parseInt(skip), limit: parseInt(limit) }
        });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        return {
            success: true,
            data: user.expenses,
            message: "Expenses retrieved successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};
module.exports.deleteExpenseService = async (expenseId) => {
    console.log(expenseId)
    try {

        const expense = await Expense.findOneAndDelete({ id: expenseId });

        if (!expense) {
            return {
                success: false,
                message: "Expense not found"
            };
        }
        return {
            success: true,
            message: "Expense deleted successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};