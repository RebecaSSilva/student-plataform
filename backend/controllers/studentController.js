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
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const students = await studentService.getStudents(page, pageSize);
    res.status(200).json(students);
  } catch (error) {
    errorHandler(error, res);
  }
}

/**
 * Retrieves a student by ID from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the retrieved student or an error.
 */
async function getStudentById(req, res) {
  try {
    const studentId = req.params.id;
    const student = await studentService.getStudent(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    errorHandler(error, res);
  }
}

/**
 * Creates a new student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the created student or an error.
 * @throws {Error} If the email format is invalid or the CPF is invalid.
 */
async function createStudent(req, res) {
  try {
    const { name, email, cpf } = req.body;
    const createdStudent = await studentService.createStudent({ name, email, cpf });
    res.status(201).json(createdStudent);
  } catch (error) {
    console.log(error);
    errorHandler(error, res);
  }
}

/**
 * Updates an existing student record in the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with the updated student or an error.
 * @throws {Error} If the student with the specified ID is not found.
 */
async function updateStudent(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedStudent = await studentService.updateStudent(id, { name, email });
    res.json(updatedStudent);
  } catch (error) {
    errorHandler(error, res);
  }
}

/**
 * Deletes an existing student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves with a success message or an error.
 */
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const result = await studentService.deleteStudent(id);
    res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res);
  }
}

module.exports = {
  getStudent,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
