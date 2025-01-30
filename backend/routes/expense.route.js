const express = require('express');
const { createExpenseValidation, updateExpenseValidator } = require('../validators/user.validator');
const { createExpense, updateExpense, deleteExpense, getExpense } = require('../controllers/expense.controller');

const router = express.Router();



router.post("/:id", createExpenseValidation, createExpense)
router.patch("/:id", updateExpenseValidator, updateExpense)
router.delete("/:id", deleteExpense)

router.get("/", getExpense);


module.exports = router;