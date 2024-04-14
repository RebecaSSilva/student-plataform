const userService = require('../services/authService');
const errorHandler = require('../utils/errorHandler');

/**
 * Handles user registration.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves once registration is complete.
 */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser({ name, email, password });
    res.send(newUser);
  } catch (error) {
    errorHandler(error, res); // Pass the response object to the errorHandler
  }
}

/**
 * Handles user login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object. b
 * @returns {Promise<void>} A promise that resolves once login is complete.
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser({ email, password });
    res.json({ token });
  } catch (error) {
    errorHandler(error, res); // Pass the response object to the errorHandler
  }
}

module.exports = {
  register,
  login
};
