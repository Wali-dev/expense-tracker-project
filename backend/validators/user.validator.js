const { param, body, validationResult } = require('express-validator');
const sendResponse = require('../utils/sendResponse');

const createUserValidationSchema = [
    body("firstname")
        .notEmpty().withMessage("First name cannot be empty")
        .isString().withMessage("First name must be a string"),
    body("lastname")
        .optional()
        .isString().withMessage("Last name must be a string"),
    body("email")
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Email must be a valid email address"),
    body("password")
        .notEmpty().withMessage("Password cannot be empty")
        .isString().withMessage("Password must be a string"),
];


const getSingleUserSchema = [
    param("id")
        .notEmpty().withMessage("Id is required")
        .isString().withMessage("Id must be a string"),
];

const createExpenseValidationSchema = [
    body("amount")
        .notEmpty().withMessage("Amount cannot be empty")
        .isNumeric().withMessage("Amount must be a number"),
    body("category")
        .optional()
        .isString().withMessage("Category must be a string"),
    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),
];

const updateExpenseValidationSchema = [
    param("id")
        .notEmpty().withMessage("Id is required")
        .isString().withMessage("Id must be a string"),
    body("amount")
        .optional()
        .isNumeric().withMessage("Amount must be a number"),
    body("category")
        .optional()
        .isString().withMessage("Category must be a string"),
    body("description")
        .optional()
        .isString().withMessage("Description must be a string"),
];

const updateExpenseValidator = [
    ...updateExpenseValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];

const createUserValidation = [
    ...createUserValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const createExpenseValidation = [
    ...createExpenseValidationSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];
const getSingleUserValidator = [
    ...getSingleUserSchema,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, false, errors.array()[0].msg);
        }
        next();
    }
];

module.exports = { createUserValidation, updateExpenseValidator, createExpenseValidation, getSingleUserValidator };
