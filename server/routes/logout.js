//login.js
const express = require('express');
const passport = require('passport'); // Update the path accordingly
const router = express.Router();

router.post('/', (req, res, next) => {
  req.logOut(req.user,(err) => {
    console.log("logging out ...");
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
