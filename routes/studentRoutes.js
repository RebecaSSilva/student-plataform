const express = require('express');
const router = express.Router();
const { errorHandler } = require('../utils/errorHandler');
const authenticateToken = require('../middleware/authenticateToken');
const {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Rotas protegidas pelo middleware de autenticação
router.get('/', authenticateToken, getStudent);
router.post('/', authenticateToken, createStudent);
router.put('/:id', authenticateToken, updateStudent);
router.delete('/:id', authenticateToken, deleteStudent);

// Middleware para lidar com erros
router.use(errorHandler);

module.exports = router;
