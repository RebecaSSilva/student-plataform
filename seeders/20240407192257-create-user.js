'use strict';

const bcrypt = require('bcryptjs');
const faker = require('faker');

const { User } = require('../models');

module.exports = {
  up: async () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
      const email = faker.internet.email();
      const password = await bcrypt.hash(faker.internet.password(), 10);
      const typeUser = faker.random.number({ min: 1, max: 3 }); 

      users.push({
        email,
        password,
        typeUser
      });
    }

    await User.bulkCreate(users);
  },

  down: async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
  },
};
