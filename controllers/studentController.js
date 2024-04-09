const studentService = require('../services/studentService');
const { errorHandler } = require('../utils/errorHandler');

async function getStudent(req, res, next) {
  try {
    const students = await studentService.getStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
}

async function createStudent(req, res, next) {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    const updatedStudent = await studentService.updateStudent(id, req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params;
    const result = await studentService.deleteStudent(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  errorHandler,
};
