const express = require('express');
const { getCurrentUser } = require('../Controller/userController');
const { authenticateToken } = require('../Middleware/authMiddleware');

const router = express.Router();

// Protected route
router.get('/current-user', authenticateToken, getCurrentUser);

module.exports = router