const express = require('express');
const router = express.Router();
const  errorHandler  = require('../utils/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');
const {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Routes protected by authentication middleware
router.get('/', authenticateToken, getStudent);
router.post('/', authenticateToken, createStudent);
router.put('/:id', authenticateToken, updateStudent);
router.delete('/:id', authenticateToken, deleteStudent);

// Middleware to handle errors
router.use(errorHandler);

module.exports = router;
