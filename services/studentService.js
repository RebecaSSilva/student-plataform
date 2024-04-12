const db = require('../models');
const cpfCheck = require('cpf-check');
const { errorHandler } = require('../utils/errorHandler');

// Regular expression pattern for validating email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A service class for managing student-related operations.
 */
class StudentService {
  /**
   * Retrieves all students from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of student objects.
   */
  async getStudents(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const students = await db.Student.findAll({ offset, limit });
      return students;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new student record in the database.
   * @param {Object} studentData - The data of the student to be created.
   * @param {string} studentData.name - The name of the student.
   * @param {string} studentData.email - The email of the student.
   * @param {string} studentData.ra - The registration number of the student.
   * @param {string} studentData.cpf - The CPF number of the student.
   * @returns {Promise<Object>} A promise that resolves to the created student object.
   */
  async createStudent({ name, email, ra, cpf }) {
    // Email validation using regular expression
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // CPF validation using cpf-check library
    if (!cpfCheck.validate(cpf)) {
      throw new Error('Invalid CPF');
    }

    try {
      return await db.Student.create({ name, email, ra, cpf });
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Updates an existing student record in the database.
   * @param {number} id - The ID of the student to be updated.
   * @param {Object} updatedData - The updated data of the student.
   * @param {string} updatedData.name - The updated name of the student.
   * @param {string} updatedData.email - The updated email of the student.
   * @returns {Promise<Object>} A promise that resolves to the updated student object.
   */
  async updateStudent(id, { name, email }) {
    try {
      const student = await db.Student.findByPk(id);
      if (!student) {
        throw new Error('Student not found');
      }
      return await student.update({ name, email });
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Deletes an existing student record from the database.
   * @param {number} id - The ID of the student to be deleted.
   * @returns {Promise<Object>} A promise that resolves to a success message.
   */
  async deleteStudent(id) {
    try {
      const student = await db.Student.findByPk(id);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.destroy();
      return { message: 'Student deleted successfully' };
    } catch (error) {
      errorHandler(error);
    }
  }
}

module.exports = new StudentService();
