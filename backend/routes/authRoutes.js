const express = require('express');
const router = express.Router();
const  errorHandler  = require('../utils/errorHandler');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// Middleware to handle errors
router.use(errorHandler);

module.exports = router;
