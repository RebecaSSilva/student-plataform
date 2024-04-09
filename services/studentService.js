const db = require('../models');
const { handleError } = require('../utils/errorHandler');

class StudentService {
  async getStudents() {
    try {
      return await db.Student.findAll();
    } catch (error) {
      throw new Error('Error fetching students');
    }
  }

  async createStudent({ name, email, ra, cpf }) {
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
