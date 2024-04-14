const db = require('../models');
const  errorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');
/**
 * A service class for managing student-related operations.
 */
class StudentService {
  /**
   * Retrieves all students from the database.
   * @param {number} [page=1] - The page number to retrieve.
   * @param {number} [pageSize=10] - The number of students per page.
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
  * Retrieves a specific student from the database.
  * @param {number} id - The ID of the student to retrieve.
  * @returns {Promise<Object|null>} A promise that resolves to the student object if found, otherwise null.
  */
  async getStudent(id) {
    try {
        const student = await db.Student.findByPk(id);
        return student;
    } catch (error) {
        throw error;
    }
  }

  /**
   * Creates a new student record in the database.
   * @param {Object} studentData - The data of the student to be created.
   * @param {string} studentData.name - The name of the student.
   * @param {string} studentData.email - The email of the student.
   * @param {bigint} studentData.cpf - The CPF number of the student.
   * @returns {Promise<Object>} A promise that resolves to the created student object.
   */
  async createStudent({ name, email, cpf }) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // Checks if the email has a valid format
      if (!emailRegex.test(email)) {
          throw new Error('Invalid email format');
      }
      // Checks if the email is already in use
      const existingEmailStudent = await db.Student.findOne({ where: { email } });
      if (existingEmailStudent) {
          throw new Error('Email already in use');
      }

      // Checks if the CPF is already in use
      const existingCpfStudent = await db.Student.findOne({ where: { cpf } });
      if (existingCpfStudent) {
          throw new Error('CPF already in use');
      }

      try {
          const ra = this.generateRandomNumber(1, 9999999999999999999); // Generate random RA
          let existingRaStudent;
          do {
              ra = this.generateRandomNumber(1, 9999999999999999999); // Generate random RA
              existingRaStudent = await db.Student.findOne({ where: { ra } });
          } while (existingRaStudent); // Keep generating a new RA until it's unique
          const student = await db.Student.create({ name, email, ra, cpf });
          return student.toJSON(); // Returns the data of the created student
      } catch (error) {
          throw new Error('Error creating student: ' + error.message); // Throws a new error with a more specific message
      }
  }
  /**
  * Generates a random number within the specified range.
  * @param {number} min - The minimum value of the range.
  * @param {number} max - The maximum value of the range.
  * @returns {number} A random number within the specified range.
  */
  generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    console.log(id);
    try {
      const student = await db.Student.findByPk(id);
      if (!student) {
        throw new Error('Student not found');
      }
      return await student.update({ name, email });
    } catch (error) {
      throw error; 
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
