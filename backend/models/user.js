'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING(100),
      allowNull: false, 
      unique: true, 
      validate: {
        isEmail: true, 
      },
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    typeUser: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
