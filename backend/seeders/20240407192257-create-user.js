'use strict';

const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  /**
   * Generate random users and insert them into the database.
   */
  up: async () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
      const email = `user${i+1}@example.com`;  // Generating a unique email for each user
      const password = await bcrypt.hash(`password`, 10);  // Generating a password
      const typeUser = 1; // Generating a type

      users.push({
        email,
        password,
        typeUser,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    try {
      await User.bulkCreate(users, { fields: ['email', 'password', 'typeUser', 'createdAt', 'updatedAt'] });
      console.log('Users created successfully!');
    } catch (error) {
      console.error('Error creating users:', error);
    }
  },

  /**
   * Delete all users from the database.
   */
  down: async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
  },
};
