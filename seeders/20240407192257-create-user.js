'use strict';

const { User } = require('../models');

module.exports = {
  up: async () => {
    await User.bulkCreate([
      {
        email: 'user1@example.com',
        password: bcrypt('password1'),
        typeUser: 1,
      }
    ]);
  },

  down: async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
  },
};