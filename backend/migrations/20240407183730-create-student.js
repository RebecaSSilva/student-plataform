'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      ra: {
        unique: true,
        allowNull: false,
        type: Sequelize.BIGINT
      },
      cpf: {
        unique: true,
        allowNull: false,
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  // Add index
  await queryInterface.addIndex('Students', ['ra']);

  await queryInterface.addIndex('Students', ['cpf']);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};