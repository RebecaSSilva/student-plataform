const express = require('express');
const router = express.Router();
const { register, login } = require('./controllers/authController');

router.post('/register', (req, res) => {
  register(req, res);
});

router.post('/login', (req, res) => {
  login(req, res);
});

module.exports = router;