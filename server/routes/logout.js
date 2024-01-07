//login.js
const express = require('express');
const passport = require('passport'); // Update the path accordingly
const router = express.Router();

router.post('/', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
