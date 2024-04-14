const express = require('express');
const router = express.Router();
const errorHandler = require('../utils/errorHandler');
const { register, login } = require('../controllers/authController');

// Routes
router.post('/register', register); // POST /auth/register
router.post('/login', login); // POST /auth/login

// Error handling middleware
router.use(errorHandler);

module.exports = router;
