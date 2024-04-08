const express = require('express');
const router = express.Router();
const { getStudent, createStudent, updateStudent, deleteStudent } = require('./controllers/studentController');

router.get('/', (req, res) => {
  getStudent(req, res);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.Student.findByPk(id)
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching student' });
    });
});

router.post('/', (req, res) => {
  createStudent(req, res);
});

router.put('/:id', (req, res) => {
  updateStudent(req, res);
});

router.delete('/:id', (req, res) => {
  deleteStudent(req, res);
});

module.exports = router;