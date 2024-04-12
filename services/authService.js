const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser({ name, email, password }) {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function loginUser({ email, password }) {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      throw new Error('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser
};
