const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: "Expense"
    }],
}, {
    timestamps: false
});

const Expense = mongoose.model("Expense", expenseSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Expense };
