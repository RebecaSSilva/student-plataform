const studentService = require('../services/studentService');
const errorHandler = require('../utils/errorHandler');

/**
 * Retrieves all students from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the retrieved students or an error.
 */
async function getStudent(req, res) {
  try {
    const students = await studentService.getStudents();
    res.status(200).json(students);
  } catch (error) {
    errorHandler(error, res); // Passes the response object to the errorHandler
  }
}

/**
 * Creates a new student.
 * @param {Object} req - The request object containing student data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the created student or an error.
 */
async function createStudent(req, res) {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    errorHandler(error, res); // Passes the response object to the errorHandler
  }
}

/**
 * Updates an existing student.
 * @param {Object} req - The request object containing the student ID and updated data.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the updated student or an error.
 */
async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updatedStudent = await studentService.updateStudent(id, req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    errorHandler(error, res); // Passes the response object to the errorHandler
  }
}

/**
 * Deletes an existing student.
 * @param {Object} req - The request object containing the student ID.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with a success message or an error.
 */
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const result = await studentService.deleteStudent(id);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res); // Passes the response object to the errorHandler
  }
}

module.exports = {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
