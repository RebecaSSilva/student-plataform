const db = require('../models');

const getStudent = async (req, res) => {
  try {
    const student = await db.Student.findAll();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, ra, cpf } = req.body;
    const newStudent = await db.Student.create({ name, email, ra, cpf });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: 'Error creating student' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const student = await db.Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const updatedStudent = await student.update({ name, email });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: 'Error updating student' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await db.Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting student' });
  }
};

module.exports = {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};