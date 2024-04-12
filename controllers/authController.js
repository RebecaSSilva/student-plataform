const userService = require('../services/userService');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser({ name, email, password });
    res.send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser({ email, password });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  register,
  login
};
