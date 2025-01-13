const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../database');

// Register a new user
router.post('/signup', (req, res) => {
  const { email, nickname, password } = req.body;

  // Validate if the necessary fields exist in the request body
  if (!email || !nickname || !password) {
    return res.status(400).send('All fields are required');
  }

  // Check if user already exists
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length > 0) return res.status(400).send('User already exists');

    // Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Error hashing password');

      // Insert new user into database
      connection.query(
        'INSERT INTO users (email, nickname, password) VALUES (?, ?, ?)',
        [email, nickname, hashedPassword],
        (err, results) => {
          if (err) return res.status(500).send('Error saving user');
          res.status(201).json('User registered successfully');
        }
      );
    });
  });
});

// Login user
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(401).send('User not found');

    // Compare passwords
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (!isMatch) return res.status(401).send('Invalid credentials');

      // Create JWT token
      const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    });
  });
});

module.exports = router;
