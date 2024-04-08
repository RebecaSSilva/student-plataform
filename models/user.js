'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    typeUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};