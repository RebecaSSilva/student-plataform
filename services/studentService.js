const db = require('../models');
const cpfCheck = require('cpf-check');
const { handleError } = require('../utils/errorHandler');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
class StudentService {
  async getStudents() {
    try {
      return await db.Student.findAll();
    } catch (error) {
      throw new Error('Error fetching students');
    }
  }

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
      throw new Error('Error creating student');
    }
  }

  async updateStudent(id, { name, email }) {
    try {
      const student = await db.Student.findByPk(id);
      if (!student) {
        throw new Error('Student not found');
      }
      return await student.update({ name, email });
    } catch (error) {
      throw new Error('Error updating student');
    }
  }

  async deleteStudent(id) {
    try {
      const student = await db.Student.findByPk(id);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.destroy();
      return { message: 'Student deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting student');
    }
  }
}

module.exports = new StudentService();
