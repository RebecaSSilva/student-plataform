function errorHandler(err, res) {
  let message;
  switch (err.message) {
    case 'Invalid email format':
      message = 'Invalid email format';
      break;
    case 'Email already in use':
      message = 'Email already in use';
      break;
    case 'User not found':
      message = 'User not found';
      break;
    case 'Invalid email or password':
      message = 'Invalid email or password';
      break;
    default:
      message = 'Server error';
  }
  res.status(500).json({ error: message });
}

module.exports = errorHandler;
