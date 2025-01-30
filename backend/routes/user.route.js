const express = require('express');
const { createUserValidation, updateUserValidator } = require('../validators/user.validator');
const { createUser, updateUser, handleLogin, getSingleProfile } = require('../controllers/user.controller');
const { checkUserAuth } = require('../middleware/auth.middleware');

const router = express.Router();


router.get("/", checkUserAuth, getSingleProfile);

router.post("/", createUserValidation, createUser)

router.post('/log-in', handleLogin)

module.exports = router;