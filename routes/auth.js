
const express = require('express');	
const router = express.Router();	
const bcrypt = require('bcryptjs');	
const jwt = require('jsonwebtoken');	
const { User } = require('../models');	

// Register route	
router.post('/register', async (req, res) => {	
    // Check if user already exists	
    const existingUser = await User.findOne({ where: { email: req.body.email } });	
    if (existingUser) return res.status(400).send('User already exists.');	

    // Hash the password	
    const salt = await bcrypt.genSalt(10);	
    const hashedPassword = await bcrypt.hash(req.body.password, salt);	

    // Create a new user	
    const newUser = new User({	
      name: req.body.name,	
      email: req.body.email,	
      password: hashedPassword,	
    });	

    try {	
      const savedUser = await newUser.save();	
      res.send(savedUser);	
    } catch (err) {	
      res.status(400).send(err);	
    }	
  });	


// Login route	
router.post('/login', async (req, res) => {	
    try {	
      // Find the user by email	
      const existingUser = await User.findOne({ where: { email: req.body.email } });	

      if (!existingUser) {	
        return res.status(400).json({ message: 'User does not exist' });	
      }	

      // Compare the provided password with the hashed password stored in the database	
      const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);	
      if (!isPasswordValid) {	
        return res.status(401).json({ message: 'Invalid email or password' });	
      }	

      // Generate a JSON Web Token	
      const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, {	
        expiresIn: '1h',	
      });	

      // Send the token to the client	
      res.json({ token });	
    } catch (err) {	
      console.log(err.message);	
      res.status(500).send('Server error');	
    }	
  });	


module.exports = router;	