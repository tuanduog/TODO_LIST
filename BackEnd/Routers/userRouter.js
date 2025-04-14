const userController = require('../Controllers/userController');
const express = require('express');
const router = express.Router();
const verifyUser = require('../Middlewares/authorMiddleware');

router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);

module.exports = router;