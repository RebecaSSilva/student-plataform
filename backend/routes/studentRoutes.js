const express = require('express');
const router = express.Router();
const errorHandler = require('../utils/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');
const {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById
} = require('../controllers/studentController');

// Routes
router.get('/', authenticateToken, getStudent); // GET /students
router.get('/:id', authenticateToken, getStudentById); // GET /students/:id
router.post('/', authenticateToken, createStudent); // POST /students
router.put('/:id', authenticateToken, updateStudent); // PUT /students/:id
router.delete('/:id', authenticateToken, deleteStudent); // DELETE /students/:id

// Error handling middleware
router.use(errorHandler);

module.exports = router;
