'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {}

  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    ra: DataTypes.NUMBER,
    cpf: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Student',
  });

  return Student;
};