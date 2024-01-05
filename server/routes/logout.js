//login.js
const express = require('express');
const passport = require('../passport-config'); // Update the path accordingly
const router = express.Router();

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // Redirect to the home page or another desired location
  });

module.exports = router;
