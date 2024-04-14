'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {}

  Student.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, 
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true,
      },
    },
    ra: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      unique: true, 
    },
    cpf: {
      type: DataTypes.BIGINT(14),
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Student',
  });

  return Student;
};
