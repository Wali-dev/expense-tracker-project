const { createExpenseService, updateExpenseService, deleteExpenseService } = require("../services/expensive.service");
const { } = require("../services/user.service");
const sendResponse = require("../utils/sendResponse")


const createExpense = async (req, res) => {
    const { id } = req.params;
    const expenseData = req.body;
    const response = await createExpenseService(id, expenseData);

    if (response.success) {
        sendResponse(res, 200, true, "User created succesfully", response.data)
    }
    else {
        sendResponse(res, 400, false, response.message)
    }

}

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const updatedExpenseData = req.body;
    const response = await updateExpenseService(id, updatedExpenseData);

    if (response.success) {
        sendResponse(res, 200, true, "Expense updated successfully", response.data)
    }
    else {
        sendResponse(res, 400, false, response.message)
    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const response = await deleteExpenseService(id);
    if (response.success) {
        sendResponse(res, 200, true, "Expense deleted successfully", response.data)
    }
    else {
        sendResponse(res, 400, false, response.message)
    }
}



module.exports = {

    createExpense,
    updateExpense,
    deleteExpense

}