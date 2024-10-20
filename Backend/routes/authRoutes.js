const express = require('express');
const { register, login, logout, refreshToken } = require('../Controller/authConrtoller');
const { requireAuth } = require('../Middleware/authMiddleware');

const router = express.Router();

// Register Route
router.post('/register', register);
//Login Route
router.post('/login', login);
//Logout Route
router.post('/logout', logout);
//Token Route
router.post('/token', refreshToken);

module.exports = router;