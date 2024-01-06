//register.js
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

router.post('/', async function(req, res, next) {
    
    const { email, password } = req.body;
  
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store the user information in the database
    const query = {
      text: 'INSERT INTO users (email, hashed_password, salt) VALUES($1, $2, $3)',
      values: [email, hashedPassword, salt],
    };
    
    // Function to check if email exists
    async function isEmailRegistered(email) {
      const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
      };

      const result = await pool.query(query);

      // If there are any rows in the result, the email is registered
      return result.rows.length > 0;
    }

    isEmailRegistered(email)
    .then(async (emailExists) => {
      if (emailExists) {
        res.status(500).json({ message: 'User already registered' });
      }else{
        try {
          await pool.query(query);
          console.log("success register");
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    })
    .catch((error) => {
      console.error('Error checking email registration:', error);
    });


  });
  
  module.exports = router;
