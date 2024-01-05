//login.js
const express = require('express');
const passport = require('../passport-config'); // Update the path accordingly
const router = express.Router();

router.post('/', passport.authenticate('local', {
    successRedirect: '/', // Redirect to the root URL on successful login
    failureRedirect: '/login', // Redirect to the login page on failed login
    failureFlash: true,
}));

module.exports = router;
