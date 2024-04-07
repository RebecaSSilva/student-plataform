'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {

    static associate(models) {
    }
  }
  Student.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    ra: DataTypes.BIGINT,
    cpf: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};