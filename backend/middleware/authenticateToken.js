const jwt = require('jsonwebtoken');

/**
 * Middleware for authenticating JWT tokens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
const authenticateToken = (req, res, next) => {
  // Extract the token from the authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Return error response if token verification fails
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    // Set user data from token in request object and call next middleware
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
