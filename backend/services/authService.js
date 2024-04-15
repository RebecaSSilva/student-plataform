const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

class AuthService {

  /**
   * Function to register a new user.
   * @param {Object} userData - The user data to be registered.
   * @param {string} userData.name - The user's name.
   * @param {string} userData.email - The user's email.
   * @param {string} userData.password - The user's password.
   * @returns {Promise<Object>} A Promise that resolves with the registered user data.
   */
  async registerUser({ email, password }) {
  // Regular expression pattern for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      // Check if the email is in a valid format
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Check if the email is already in use
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Generate the hash of the user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user in the database
      const newUser = await User.create({ email, password: hashedPassword });

      return newUser;
    } catch (error) {
      errorHandler(error);
    }
  }

  /**
   * Function to authenticate a user.
   * @param {Object} credentials - The user credentials for login.
   * @param {string} credentials.email - The user's email.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise<string>} A Promise that resolves with the authentication token.
   */
  async loginUser({ email, password }) {
    try {
      // Find the user in the database by the provided email
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        throw new Error('User not found');
      }

      // Verify if the provided password matches the stored password hash
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate an authentication token valid for 1 hour
      const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, {
        expiresIn: '4h',
      });

      return token;
    } catch (error) {
      errorHandler(error);
    }
  }
}

module.exports = new AuthService();
