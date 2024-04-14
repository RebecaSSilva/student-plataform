'use strict';

const { Student } = require('../models');

module.exports = {
  /**
   * Generate random students and insert them into the database.
   * @param {Object} queryInterface - Sequelize Query Interface.
   * @param {Object} Sequelize - Sequelize module.
   */
  up: async (queryInterface) => {
    const students = [];

    for (let i = 0; i < 10; i++) {
      const name = `Student ${i+1}`; 
      const email = `student${i+1}@example.com`; // Generating a unique email for each student
      const ra = Math.floor(Math.random() * 900000) + 100000; // Generating a random 6-digit RA
      const cpf = Math.floor(Math.random() * 90000000000) + 10000000000; // Generating a random 11-digit CPF

      students.push({
        name,
        email,
        ra,
        cpf,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Students', students, {});
  },

  /**
   * Delete all students from the database.
   * @param {Object} queryInterface - Sequelize Query Interface.
   * @param {Object} Sequelize - Sequelize module.
   */
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
